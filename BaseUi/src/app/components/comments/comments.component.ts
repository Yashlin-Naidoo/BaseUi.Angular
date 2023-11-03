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
  constructor(private http: HttpClient) {
    this.sortBy = '';
    this.sortDirection = 'asc'; // Assign sortDirection property in the constructor
  }
  ngOnInit(): void {
    this.getCommentsAndCalculate()

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
    this.startComplexCalculation()
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

  startComplexCalculation() {
    this.complexCalculationInProgress = true;

    // Simulate a complex calculation (calculating Fibonacci of 40)
    this.fibonacciResult = this.fibonacci(40);

    // Set a delay to make the browser appear unresponsive
    setTimeout(() => {
      this.complexCalculationInProgress = false;
      console.log(`Complex calculation result: ${this.fibonacciResult}`);
      return this.fibonacciResult;
    }, 2000); // Delay for 2 seconds
  }

  fibonacci(n: number): number {
    if (n <= 1) {
      return n;
    }
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

}
