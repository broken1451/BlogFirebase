import { Component, OnInit, Input } from '@angular/core';
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

  public post1: Post = {
    id: '1',
    titlePost: 'one post',
    contentPost: 'hello',
    imagePost:
      'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  };

  // public post$: Observable<Post[]>
  @Input() post: Post;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.postService.getAllPost().subscribe((res)=>{
    //   console.log('res: ==>>>>>>>>>>', res);
    // })
    // this.post$ = this.postService.getAllPost();
  }
}
