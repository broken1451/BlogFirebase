import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../shared/models/post.interface';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  // public post:
  //   {
  //       id: string,
  //       titlePost: string,
  //       contentPost: string,
  //       imagePost:string
  // } = {
  //   id:'1',
  //   titlePost:'one post',
  //   contentPost:'hello',
  //   imagePost: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
  // }

  public post: Post = {
    id: '1',
    titlePost: 'one post',
    contentPost: 'hello',
    imagePost:
      'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  };

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
