import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post.interface';
import { PostService } from '../../posts/post.service';
import { Observable } from 'rxjs';

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
  // public post: Post[] = [
  //   {
  //     id: '1',
  //     titlePost: 'Post One',
  //     contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
  //   industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
  //   a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
  //   It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
  //   software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //     imagePost:
  //       'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  //   },
  //   {
  //     id: '2',
  //     titlePost: 'Post two',
  //     contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
  //   industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
  //   a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
  //   It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
  //   software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //     imagePost:
  //       'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  //   },
    
  //   {
  //     id: '3',
  //     titlePost: 'Post two',
  //     contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
  //   industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
  //   a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
  //   It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
  //   software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //     imagePost:
  //       'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  //   },
    
  //   {
  //     id: '4',
  //     titlePost: 'Post two',
  //     contentPost: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
  //   industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
  //   a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
  //   It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
  //   software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //     imagePost:
  //       'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  //   },
  // ];

  public post$: Observable<Post[]>

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.postService.getAllPost().subscribe((res)=>{
    //   console.log('res: ==>>>>>>>>>>', res);
    // })
    this.post$ = this.postService.getAllPost();
  }
}
