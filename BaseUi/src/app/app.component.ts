import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestArray, ResponseArray, SessionStorageService } from './session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BaseUi';

  private baseUrl = 'https://jsonplaceholder.typicode.com';
  public posts: any[] = [];
  public comments: any[] = [];
  public requestArray:RequestArray[] = [];
  public responseArray:ResponseArray[] = [];

  constructor(private http: HttpClient , private sessionStorageService: SessionStorageService) {
    this.makeNetworkCallsInLoop();
   }

   ngOnInit(): void {
    const sessionObject = this.sessionStorageService.retrieveRequestObjectFromStorage();
    this.requestArray = sessionObject.requestData
    this.responseArray = sessionObject.responseData
   }

  makeNetworkCallsInLoop(){
    for (let index = 0; index < 5; index++) {
      this.getAllPosts().subscribe(data => {
        this.posts = data;
      });

      this.getAllComments().subscribe(data => {
        this.comments = data;
      });

    }
    this.getPostById(1).subscribe(data => {
      console.log(data)
    });

    this.getCommentsByPostId(1).subscribe(data => {
      console.log(data)
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
