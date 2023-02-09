import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";

@Injectable()
export class ReservationService {
  data: any;
  serverTime: any;
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // RESERVE
  async reserve(tennantName: string, time: number) {
    try {
      return this.http
        .post(`${this.baseUrl}/reserve`, {
          tennantName,
          time,
          reserved: true,
        })
        .subscribe();
    } catch (err) {
      console.log(err);
    }
  }

  // UNRESERVE
  unReserve(tennantName: string, time: number) {
    try {
      this.http
        .post(`${this.baseUrl}/reserve`, {
          tennantName,
          time,
          reserved: false,
        })
        .subscribe();
    } catch (err) {
      console.log(err);
    }
  }

  // GET ALL RESERVATIONS
  async getReservations(startTime: number, endTime: number) {
    try {
      this.data = await this.http
        .get(`${this.baseUrl}/reserve/${startTime}/${endTime}`)
        .pipe(take(1))
        .toPromise();
      return this.data;
    } catch (err) {
      console.log(err);
    }
  }

  // GET SERVER TIME
  async getServerTime() {
    try {
      this.serverTime = await this.http
        .get(`${this.baseUrl}/now`)
        .pipe(take(1))
        .toPromise();
      return this.serverTime.time;
    } catch (err) {
      console.log(err);
    }
  }
}
