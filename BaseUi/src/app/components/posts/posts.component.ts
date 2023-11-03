import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  public posts: any[] = [];

  constructor(private http: HttpClient ,) {

   }

   ngOnInit(): void {
    this.getAllPosts().subscribe(data => {
      this.posts = data;
    });
   }


  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }
}
