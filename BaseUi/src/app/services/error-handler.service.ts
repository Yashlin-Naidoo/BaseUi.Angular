import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {

    // Log the error to the console or send it to a logging service
    console.error('Global Error Handler:', error);

    // You can also perform other actions here, like displaying an error message
    // or navigating to an error page.
  }
  constructor() { }
}
