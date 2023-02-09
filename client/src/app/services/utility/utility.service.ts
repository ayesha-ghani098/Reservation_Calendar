import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class UtilityService {
  dataChanged = new EventEmitter();

  constructor() {}

  getTimeStamp(date: Date) {
    return Date.parse(date.toISOString());
  }

  // Get Current Month
  getMonthName(date: Date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[date.getMonth()];
  }

  notifyDataChanged() {
    this.dataChanged.emit();
  }
}
