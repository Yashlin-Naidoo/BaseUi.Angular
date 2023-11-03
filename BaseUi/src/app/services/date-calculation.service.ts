import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateCalculationService {

  constructor() { }

  getCurrentDate(): moment.Moment {
    return moment();
  }

  addDaysToDate(inputDate: moment.Moment, daysToAdd: number): moment.Moment {
    return inputDate.clone().add(daysToAdd, 'days');
  }

  subtractDaysFromDate(inputDate: moment.Moment, daysToSubtract: number): moment.Moment {
    return inputDate.clone().subtract(daysToSubtract, 'days');
  }
}
