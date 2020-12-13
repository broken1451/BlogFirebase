import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Post } from '../../shared/models/post.interface';
import { File } from '../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postCollection: AngularFirestoreCollection<Post>;
  private filePath: any;
  private urlImg: Observable<string>;

  constructor(
    private angularFireStore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    // accedera la collection de firebase
    this.postCollection = angularFireStore.collection<Post>('posts');
  }

  getAllPost(): Observable<Post[]> {
    // return this.angularFireStore.collection('posts')
    return this.postCollection.snapshotChanges().pipe(
      map((posts) =>
        posts.map((posts) => {
          // console.log({ posts });
          const data = posts.payload.doc.data() as Post;
          const id = posts.payload.doc.id;
          // console.log('Data: ====> ', data);
          // console.log('ID: ====> ', id);
          return { id, ...data };
        })
      )
    );
  }

  getOnePost(id: string): Observable<Post> {
    return this.angularFireStore.doc<Post>(`posts/${id}`).valueChanges();
  }

  deletePost(post: Post) {
    return this.postCollection.doc(post.id).delete();
  }

  updatePost(post: Post) {
    return this.postCollection.doc(post.id).update(post);
  }

  private uploadImg(post: Post, img: File) {
    // creando ruta en storage de firebaseStorage
    this.filePath = `images/${img.name};`;
    // referencia donde se encuentra la imagen
    const fileRef = this.storage.ref(this.filePath);
    // tarea para subir la img
    const taks = this.storage.upload(this.filePath, img);
    taks
      .snapshotChanges()
      .pipe(
        finalize(() => {
          // devuelve la url de la img
          fileRef.getDownloadURL().subscribe((urlImg) => {
            console.log({ urlImg, post });
            this.urlImg = urlImg;
            // call addPost()
            this.savePost(post);
          });
        })
      )
      .subscribe((res) => {
        console.log('res =====> ', res);
      });
  }

  preAddAndUpdatePost(post: Post, img: File) {
    this.uploadImg(post, img);
  }

  private savePost(post: Post) {
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.urlImg,
      fileRef: this.filePath,
      tagsPost: post.tagsPost,
    };
    // TODO edit post
    this.postCollection.add(postObj);
  }
}
