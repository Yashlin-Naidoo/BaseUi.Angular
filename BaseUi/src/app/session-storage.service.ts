import { Injectable } from '@angular/core';
export const REQUEST_ARRAY_KEY = "reqObjectArray"
export const RESPONSE_ARRAY_KEY = "resObjectArray"

export interface ResponseArray {
  count: number;
  size: string;
  status: number;
  timeTaken: string;
  urlWithParams: string;
}
export interface RequestArray {
  size: string
  method: string
  responseType: string
  url: string
  urlWithParams: string
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  getItem(key: string) {
    try {
      const result = JSON.parse(sessionStorage.getItem(key) || '{}');
      return result;

    } catch (error: any) {
      console.log(error);
    }
  }

  setItem(key: string, value: string | any) {
    try {
      return sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  removeItem(key: string) {
    try {
      return sessionStorage.removeItem(key);
    } catch (error) {
      console.log(error);

    }
  }

  clearEntireSession() {
    sessionStorage.clear();
  }

  setArrayItem(key: string, value: any) {
    let array = this.getItem(key);
    if (array && array.length > 0) {
      array.push(value);
    }
    else {
      array = [value];
    }
    this.setItem(key, array);
  }


  reduceAndCountRequests(requestList: RequestArray[]) {
    let dedupe: any[] = [];
    dedupe = this.removeDuplicates(requestList, "urlWithParams")
    dedupe.forEach(element => {
      const propValues = this.findOccurrences(requestList, "urlWithParams", element.urlWithParams)
      element.count = propValues
    });
    dedupe.sort((a, b) => b.count - a.count);
    return dedupe;
  }

  findOccurrences(arr: any[], prop: string, value: string) {
    const matches = arr.filter(obj => obj[prop] === value);
    return matches.length;
  }

  removeDuplicates = (arr: RequestArray[], prop: keyof RequestArray): RequestArray[] => {
    const seen: { [key: string]: boolean } = {};
    return arr.reduce((acc: RequestArray[], obj: RequestArray) => {
      if (!seen[obj[prop].toString()]) {
        seen[obj[prop].toString()] = true;
        acc.push(obj);
      }
      return acc;
    }, []);
  }

  retrieveRequestObjectFromStorage() {
    const resData = this.getItem(RESPONSE_ARRAY_KEY)
    const reqData: RequestArray[] = this.getItem(REQUEST_ARRAY_KEY)
    const requestData = this.reduceAndCountRequests(reqData)
    const responseData = this.reduceAndCountRequests(resData)
    return { requestData, responseData }
  }


}
