import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PostService } from '../../../components/posts/post.service';
import { Post } from '../../models/post.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  public dataSource = new MatTableDataSource();
  public data: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private postsService: PostService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllPost();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllPost() {
    this.postsService.getAllPost().subscribe((posts) => {
      this.dataSource.data = posts;
      console.log('aja', { posts });
    });
  }

  newPost() {
    this.openDialog();
  }

  openDialog(post?: Post) {
    const config = {
      data: {
        message: post ? 'Edit post' : 'New post',
        content: post,
      },
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.data = result;
      console.log({ result });
    });
  }

  edit(element: Post) {
    console.log(element);
    this.openDialog(element);
  }

  delete(element: Post) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (borrar) => {
      if (borrar.value) {
        this.postsService
          .deletePost(element)
          .then((postDeleted) => {
            console.log(postDeleted);
          })
          .catch((err) => console.log(err));
        Swal.fire({
          title: '',
          text: 'El post fue borrado exitosamente',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          icon: 'success',
          confirmButtonText: 'ok!',
          showCancelButton: false,
          allowOutsideClick: false,
        });
        this.getAllPost();
        setTimeout(() => {
          Swal.close();
        }, 3000);
      } else if (borrar.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado esta a salvo :)', '', 'info');
      }
    });
  }
}
