import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs'

import { environment } from '@env';

const PLACES_API_URL = `https://places.cit.api.here.com/places/v1/browse?app_id=${environment.HERE_APP_ID}&app_code=${environment.HERE_APP_CODE}`
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  coord : any;

  constructor(private http : HttpClient) {
  }

  getProperties(searchTerm : string) {
    if(!this.coord){
      return of()
    }
    let url = `${PLACES_API_URL}&at=${this.coord.lat},${this.coord.lng}&cat=accommodation&q=${searchTerm}`;
    return this.http.get<any[]>(url, httpOptions)
  }

  getProperty(id : string){
    let url = `https://places.cit.api.here.com/places/v1/places/lookup?app_id=${environment.HERE_APP_ID}&app_code=${environment.HERE_APP_CODE}&source=sharing&id=${id}`
    return this.http.get<any>(url, httpOptions)
              .toPromise()
  }



  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        this.coord = {lng: resp.coords.longitude, lat: resp.coords.latitude}
        resolve(this.coord);
      },
      err => {
        reject(err);
      });
    });
  }
}
