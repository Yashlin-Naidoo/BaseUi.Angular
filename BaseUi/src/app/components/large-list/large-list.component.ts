import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-large-list',
  templateUrl: './large-list.component.html',
  styleUrls: ['./large-list.component.scss']
})
export class LargeListComponent implements OnInit {
  items: {
    name: string;
    calculatedField1: number;
    calculatedField2: number;
    calculatedField3: number;
  }[] = [];
  data: string = 'Initial Data';
  inputValue: string = '';

  constructor() {}
  updateData() {
    this.data = 'Button Clicked: ' + new Date().toLocaleTimeString();
  }
  ngOnInit() {
    // Generate a large list of items (e.g., 1000 items)
    for (let i = 1; i <= 10000; i++) {
      const newItem = {
        name: `Item ${i}`,
        calculatedField1: this.calculateComplexField1(i),
        calculatedField2: this.calculateComplexField2(i),
        calculatedField3: this.calculateComplexField3(i)
      };
      this.items.push(newItem);
    }
    setInterval(() => {
      this.data = 'Updated Data: ' + new Date().toLocaleTimeString();
    }, 1000);
  }

  addItem() {
    const newItem = {
      name: `New Item ${this.items.length + 1}`,
      calculatedField1: this.calculateComplexField1(this.items.length + 1),
      calculatedField2: this.calculateComplexField2(this.items.length + 1),
      calculatedField3: this.calculateComplexField3(this.items.length + 1)
    };
    this.items.push(newItem);

  }

  public calculateComplexField1(value: number): number {
    // Example: Calculate a complex field (factorial of the value)
    return this.calculateFactorial(value);
  }

  public calculateComplexField2(value: number): number {
    // Example: Calculate a complex field (square of the value)
    return value * value;
  }

  public calculateComplexField3(value: number): number {
    // Example: Calculate a complex field (cube of the value)
    return value * value * value;
  }

  public calculateFactorial(n: number): number {
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * this.calculateFactorial(n - 1);
  }
}
