import { Injectable } from '@angular/core';
import { AppConfig } from '../appconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostListItem } from '../model/postlistitem';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly URL = AppConfig.url + "/blog";

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<PostListItem[]> {
    return this.httpClient.get<PostListItem[]>(this.URL).pipe(map(posts => _.orderBy(posts, ["id"], ["desc"])));
  }

  createBlog(blog: PostListItem): Observable<PostListItem> {
    return this.httpClient.post<PostListItem>(`${this.URL}/create`, blog);
  }
  
  deleteBlog(id: number): Observable<PostListItem> {
    return this.httpClient.delete<PostListItem>(`${this.URL}/${id}`);
  }

  updateBlog(id: number, blog: PostListItem): Observable<PostListItem> {
    return this.httpClient.put<PostListItem>(`${this.URL}/${id}`, blog);
  }
}
