import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-gen-profile',
  templateUrl: './gen-profile.component.html',
  styleUrls: ['./gen-profile.component.css']
})

export class GenProfileComponent implements OnInit {
  public post: Post;
  listofPosts: any;
  
 

  constructor(private postService: PostService, private router: Router) {
    this.post = new Post();
  }
  
  createPost() {
    if (this.post.title && this.post.body) {
      this.postService.createPost(this.post).subscribe((res: any) => {
         console.log('response is', res) 
         this.listAllPost();      
      });
      
      // call the service method to add post
    } else {
      alert('Title and Description required');
    }
  }
  
  listAllPost() {
    this.postService.getAllPosts().subscribe(response => {
      console.log(response);
      this.listofPosts = response;
    });
  }


  btnClickBoom () {
    this.router.navigateByUrl('/gen-boom');
  };
 
  btnClickX () {
    this.router.navigateByUrl('/gen-xer');
  };

  btnClickMill () {
    this.router.navigateByUrl('/gen-mill');
  };
  
  ngOnInit(): void {
    if (localStorage.getItem("loggedin") === null || localStorage.getItem("loggedin") === "false") {
     window.alert("please login first to access this page")
      this.router.navigateByUrl("/login")
    }
    this.listAllPost();
  }

}

