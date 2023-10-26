import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SessionStorageService, REQUEST_ARRAY_KEY, RESPONSE_ARRAY_KEY } from './session-storage.service';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  constructor(private sessionStorageService: SessionStorageService) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    // Modify the request here if needed
    const { body, method, responseType, url, urlWithParams } = req;
    const stringSize = JSON.stringify(body).length;
    const size = this.charactersToKilobytes(stringSize) + ' kb'
    this.sessionStorageService.setArrayItem(REQUEST_ARRAY_KEY, { method, responseType, url, urlWithParams, size, count: 1 });

    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const { body, status, url } = event;
            const urlWithParams = url
            const endTime = Date.now();
            const timeTaken = (endTime - startTime) + ' ms'
            const stringSize = JSON.stringify(body).length; // rough estimate in characters
            const size = this.charactersToKilobytes(stringSize) + ' kb'

            this.sessionStorageService.setArrayItem(RESPONSE_ARRAY_KEY, { urlWithParams, status, timeTaken, size, count: 1 })


          }
        },
        error: (error) => {
          // Handle or log errors globally here
          console.error('Error occurred:', error);
        }
      }))
  }


  charactersToKilobytes(numCharacters: number) {
    const bytes = numCharacters * 2; // UTF-16 encoding
    return bytes / 1024;
  }


}
