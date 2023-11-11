import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  converDotNEtDateToTypeScriptDate(date: string): Date {
    var dateParts = date.split('-');
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]);
    var day = parseInt(dateParts[2].split('T')[0]);
    return new Date(year, month - 1, day);
  }

  compareDates(date1: Date, date2: Date): number {
    var year1 = date1.getFullYear();
    var month1 = date1.getMonth();
    var day1 = date1.getDate();

    var year2 = date2.getFullYear();
    var month2 = date2.getMonth();
    var day2 = date2.getDate();

    if (year1 > year2) {
      return 1;
    } else if (year1 < year2) {
      return -1;
    } else {
      if (month1 > month2) {
        return 1;
      } else if (month1 < month2) {
        return -1;
      } else {
        if (day1 > day2) {
          return 1;
        } else if (day1 < day2) {
          return -1;
        } else {
          return 0;
        }
      }
    }
  }

}
