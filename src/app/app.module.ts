import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { Sidenav } from '@shared/components/sidenav/sidenav.component';
import { UserDialogComponent } from '@shared/components/user-dialog/user-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';

@NgModule({
  declarations: [AppComponent, Sidenav, UserDialogComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, AppRoutingModule, SharedModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule {}
