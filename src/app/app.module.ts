import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app/app.component';
import {provideHttpClient, withInterceptorsFromDi,} from '@angular/common/http';
import {TasksService} from './services/tasks.service';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {WeatherService} from './services/weather.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    // core
    CoreModule,
    // app
    AppRoutingModule,
    SharedModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), TasksService, WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
