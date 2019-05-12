import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '@env';

const BOOKINGS_URL = `${environment.API_URL}/bookings`

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http : HttpClient) { }

  addBooking(data){
    return this.http.post(BOOKINGS_URL, data, httpOptions)
                    .toPromise()
  }
}
