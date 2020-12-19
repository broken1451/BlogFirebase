import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../shared/models/post.interface';
import { PostService } from '../../posts/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // public post: {
  //   id: string,
  //   titlePost: string,
  //   contentPost: string,
  //   imagePost:string
  // }[]=[]

  public post$: Observable<Post[]>;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.post$ = this.postService.getAllPost();
  }
}
