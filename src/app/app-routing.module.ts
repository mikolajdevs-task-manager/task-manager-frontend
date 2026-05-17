import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@core/auth-guard.service';
import { AppPath } from './app-routing.model';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@features/projects/projects-module').then((m) => m.ProjectsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: AppPath.home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
