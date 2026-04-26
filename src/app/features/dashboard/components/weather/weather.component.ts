import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {WeatherService} from '../../../../services/weather.service';
import {BehaviorSubject} from 'rxjs';
import {Weather} from '@model/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class WeatherComponent implements OnInit {
  private weather = new BehaviorSubject<Weather | null>(null);
  protected weather$ = this.weather.asObservable();

  protected alertState = new BehaviorSubject<boolean>(true);

  constructor(private weatherService: WeatherService) {
  }

  public ngOnInit(): void {
    this.weatherService.getWeather().subscribe(this.weather);
  }

  protected close(): void {
    this.alertState.next(false);
  }
}
