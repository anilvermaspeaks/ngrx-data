import { PostsDataService } from './posts-data.service';
import {
  EntityDefinitionService,
  EntityMetadataMap,
  EntityDataService,
} from '@ngrx/data';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsResolver } from './posts.resolver';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsEditComponentComponent } from './posts-edit-component/posts-edit-component.component';
import { Post } from 'src/models/post.model';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostsResolver },
  },
  {
    path: ':id',
    component: PostsEditComponentComponent,
  },
];

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false,
    },
  },
};

@NgModule({
  declarations: [PostsListComponent, PostsEditComponentComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  providers: [PostsResolver, PostsDataService],
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    PostsDataService: PostsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerService('Post', PostsDataService);
  }
}
