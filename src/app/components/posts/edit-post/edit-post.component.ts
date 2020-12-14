import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../../shared/models/post.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  private image: any;
  private imageOriginal: any;
  @Input() post: Post;
  public editForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValueForm();
  }

  get newPost() {
    return this.editForm.controls;
  }

  editPost(post: Post) {
    console.log('Img', this.image);
    console.log('ImgOriginal', this.imageOriginal); 
    if (this.image ==  this.imageOriginal) {
      post.imagePost = this.imageOriginal;
      // call method(post)
      this.postService.updatePost(post);
    } else {
      // call method(post, imagen)
      this.postService.updatePost(post, this.image);
      console.log('acaaaaa')
    }
  }

  handleImg(event: any) {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  private initValueForm() {
    this.editForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost,
    });
  }
}
