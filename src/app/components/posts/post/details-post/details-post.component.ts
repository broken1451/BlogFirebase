import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../../shared/models/post.interface';
import { Observable } from 'rxjs';
import { PostService } from '../../post.service';

{PostService}

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss']
})
export class DetailsPostComponent implements OnInit {

  public post$: Observable<Post>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostService
  ) {}

  ngOnInit(): void {
   const id= this.activatedRoute.snapshot.params.id;
    // this.activatedRoute.snapshot.params.id
    // this.activatedRoute.snapshot.paramMap.get('id');
    this.getOnePost(id)
  }

  getOnePost(id: string) {
    this.post$ = this.postsService.getOnePost(id);
  }

}
