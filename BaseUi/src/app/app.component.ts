import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BaseUi';

  private baseUrl = 'https://jsonplaceholder.typicode.com';
  public posts: any[] = [];
  public comments: any[] = [];

  constructor(private http: HttpClient) {
    this.getAllPosts().subscribe(data => {
      this.posts = data;
    });

    this.getAllComments().subscribe(data => {
      this.comments = data;
    });
   }

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${id}`);
  }

  getAllComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments`);
  }

  getCommentsByPostId(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts/${postId}/comments`);
  }

}
