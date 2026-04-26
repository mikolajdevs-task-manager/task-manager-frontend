import { NgModule } from '@angular/core';
import { AuthRoutingModule } from '@features/auth/auth-routing.module';
import { LoginComponent } from '@features/auth/components/login/login.component';
import { RegisterComponent } from '@features/auth/components/register/register.component';
import { AuthComponent } from '@features/auth/containers/auth/auth.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [SharedModule, AuthRoutingModule]
})
export class AuthModule {}
