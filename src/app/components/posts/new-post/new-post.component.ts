import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../../shared/models/post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  private img: any;
  public newPostForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  constructor(private postService: PostService) {}

  ngOnInit(): void {}
 
  get newPost(){
    return this.newPostForm.controls;
  }

  addNewPost(){
    // if (!this.img) {
    //   this.img = 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
    //   this.postService.preAddAndUpdatePost(this.newPostForm.value, this.img);
    //   return
    // } else { 
    //   return;
    // }
    this.postService.preAddAndUpdatePost(this.newPostForm.value, this.img);
  }

  handleImg(event){
    console.log(event.target.files)
    if (this.img == '') {
      this.img = 'https://i.stack.imgur.com/GNhxO.png';
    } else {
      this.img = event.target.files[0];
    }
  }
}
