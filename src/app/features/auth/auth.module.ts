import {NgModule} from '@angular/core';
import {LoginComponent} from '@features/auth/components/login/login.component';
import {SharedModule} from '@shared/shared.module';
import {AuthRoutingModule} from '@features/auth/auth-routing.module';
import {RegisterComponent} from '@features/auth/components/register/register.component';
import {AuthComponent} from '@features/auth/containers/auth/auth.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
