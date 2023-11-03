import { Component } from '@angular/core';
import { DateCalculationService } from 'src/app/services/date-calculation.service';

@Component({
  selector: 'app-date-calculation',
  templateUrl: './date-calculation.component.html',
  styleUrls: ['./date-calculation.component.scss']
})
export class DateCalculationComponent {
  dateRange: moment.Moment[] = [];
  tableHeaders: string[] = ['Date', 'Day of Week'];

  constructor(private dateCalculationService: DateCalculationService) {
    this.generateDateRange();
  }

  generateDateRange() {
    this.dateRange = [];
    const currentDate = this.dateCalculationService.getCurrentDate();

    for (let i = 0; i < 7; i++) { // Change 7 to the number of days you want in the table
      const date = currentDate.clone().add(i, 'days');
      this.dateRange.push(date);
    }
  }
}
