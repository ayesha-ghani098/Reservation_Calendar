import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// Services
import { ReservationService } from '../../services/reservation/reservation.service';
import { UtilityService } from '../../services/utility/utility.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [ReservationService,UtilityService]

})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  monthName = this.utility.getMonthName(this.currentDate);
  year = this.currentDate.getFullYear();
  calendar: {
    day: number | null;
    date: Date | null;
    tenant: string;
    reserved: boolean;
  }[][] = [];

  // Form props
  showForm = false;
  mode: 'add' | 'delete' = 'add';

  // Selected Date
  selectedDate: Date = new Date();
  selectedTenant: string = '';
  reservations: any;

  constructor(
    private reservationService: ReservationService,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    this.generateCalendar();

    this.utility.dataChanged.subscribe(() => {
      this.generateCalendar();
    });
  }

  async generateCalendar() {
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numOfDays = lastDay.getDate();
    const startingDay = firstDay.getDay();

    let calendar: {
      day: number | null;
      date: Date | null;
      tenant: string;
      reserved: boolean;
    }[][] = [];
    let week: {
      day: number | null;
      date: Date | null;
      tenant: string;
      reserved: boolean;
    }[] = [];

    for (let i = 0; i < startingDay; i++) {
      week.push({
        day: null,
        date: null,
        tenant: '',
        reserved: false,
      });
    }

    const startTimestamp = this.utility.getTimeStamp(firstDay);
    const endTimestamp = this.utility.getTimeStamp(lastDay);

    // Get Reservations from backend initially if there are any
    this.reservations = await this.reservationService.getReservations(
      startTimestamp,
      endTimestamp
    );

    console.log('Reservations', this.reservations);
    console.log(
      `Timestamps for ${this.monthName}`,
      startTimestamp,
      endTimestamp
    );

    for (let i = 1; i <= numOfDays; i++) {
      const date = new Date(year, month, i);

      // Finding Reservation Matching with the date
      let reservation = this.reservations? this.reservations.reserved.find(
        (element: { time: number }) => {
          return moment
            .unix(Date.parse(date.toISOString()))
            .isSame(moment.unix(element.time), 'day');
        }
      ): [];

      // Pushing reservations in week
      week.push({
        day: i,
        date: date,
        tenant: reservation ? reservation.tennantName : '',
        reserved: reservation ? true : false,
      });

      // Pushing each week in calendar
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // Pushing empty reservation object to better display calendar
    // if week.length < 7 them empty objects ll be inserted
    if (week.length > 0) {
      for (let i = week.length; i < 7; i++) {
        week.push({
          day: null,
          date: null,
          tenant: '',
          reserved: false,
        });
      }
      calendar.push(week);
    }

    this.calendar = calendar;
  }

  // Previous Month Handler
  previousMonth() {
    this.currentDate = new Date(this.year, this.currentDate.getMonth() - 1, 1);
    this.monthName = this.utility.getMonthName(this.currentDate);
    this.year = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  // Next Month Handler
  nextMonth() {
    this.currentDate = new Date(this.year, this.currentDate.getMonth() + 1, 1);
    this.monthName = this.utility.getMonthName(this.currentDate);
    this.year = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  // Show Add form Handler
  onDateClick(date: any) {
    this.selectedDate = date.date;
    this.mode = 'add';
    this.showForm = true;
    this.handleOpen();
  }

  // Show Delete form Handler
  onTenantClick(date: any) {
    this.selectedDate = date.date;
    this.selectedTenant = date.tenant;
    this.mode = 'delete';
    this.handleOpen();
  }

  // Close Form
  handleClose() {
    this.showForm = false;
  }

  // Open Form
  handleOpen() {
    this.showForm = true;
  }
}
