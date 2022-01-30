import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../post.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-posts-edit-component',
  templateUrl: './posts-edit-component.component.html',
  styleUrls: ['./posts-edit-component.component.css'],
})
export class PostsEditComponentComponent implements OnInit {
  loading$: Observable<boolean>;
  editPostForm: FormGroup;
  id: number;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading$ = this.postService.loading$;
    this.editPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });

    this.id = +this.route.snapshot.params['id'];
    this.postService.collection$.subscribe((collection) => {
      const post = collection.entities[this.id];
      if (post) {
        this.editPostForm.setValue({
          title: post?.title,
          description: post?.body,
        });
      }
    });
  }

  onEditPost() {
    const postData = {
      ...this.editPostForm.value,
      id: this.id,
    };

    this.postService.update(postData).subscribe(
      (post) => {
        console.log(post);

        this.router.navigate(['/posts']);
      },
      (err) => {
        console.log('err', err);
      }
    );
    //
  }
}
