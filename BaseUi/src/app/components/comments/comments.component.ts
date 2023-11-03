import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  public comments: any[] = [];
  totalCharacters = 0;
  sortBy = '';
  sortDirection = ''; // Initialize sortDirection property
  complexCalculationInProgress: boolean = false;
  fibonacciResult: number = 0;
  worker = new Worker(new URL('../../app.worker', import.meta.url));
  constructor(private http: HttpClient) {
    this.sortBy = '';
    this.sortDirection = 'asc'; // Assign sortDirection property in the constructor



  }
  ngOnInit(): void {
    this.getCommentsAndCalculate()

    this.worker.postMessage("message");
    this.worker.onmessage = ({ data }) => {

      this.fibonacciResult = data;
    };
  }



  getCommentsAndCalculate(){
    this.getAllComments().subscribe(data => {
      this.comments = data;
      this.totalCharacters = this.calculateTotalCharacters(data);
    });
  }

  getAllComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments`);
  }

  calculateTotalCharacters(comments: any[]): number {
    return comments.reduce((total, comment) => total + comment.body.length, 0);
  }

  calculatePercentage(body: string): number {
    return (body.length / this.totalCharacters) * 100;
  }

  sort(column: string) {

    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }

    // Sort the comments based on the selected column and direction
    this.comments.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
  }



}
