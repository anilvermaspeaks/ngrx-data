import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from './../../models/post.model';
import { Injectable } from '@angular/core';
import {
  DefaultDataService,
  DefaultDataServiceConfig,
  HttpUrlGenerator,
} from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://jsonplaceholder.typicode.com/',
  timeout: 3000,
};
@Injectable()
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator, defaultDataServiceConfig);
  }
}
