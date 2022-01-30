import { Observable } from 'rxjs';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
    this.loading$ = this.postService.loading$;
  }

  editPost(post: Post) {
    this.router.navigate([`./${post.id}`], { relativeTo: this.route });
  }
}
