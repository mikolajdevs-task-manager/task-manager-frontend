import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinates, Weather } from '@model/weather.model';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = '/api/weather';

  constructor(private httpClient: HttpClient) {}

  public getWeather(): Observable<Weather> {
    return this.getCoordinates().pipe(
      switchMap((coordinates) => {
        const params = new HttpParams()
          .set('latitude', coordinates.latitude.toString())
          .set('longitude', coordinates.longitude.toString());
        return this.httpClient.get<Weather>(this.apiUrl, { params });
      })
    );
  }

  private getCoordinates(): Observable<Coordinates> {
    return new Observable<Coordinates>((observer) => {
      if (!navigator.geolocation) {
        observer.error('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }
}
