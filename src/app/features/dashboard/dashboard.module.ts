import { NgModule } from '@angular/core';
import { DashboardComponent } from '@features/dashboard/containers/dashboard/dashboard.component';
import { CreateTaskComponent } from '@features/dashboard/components/create-task/create-task.component';
import { TasksTableComponent } from '@features/dashboard/components/tasks-table/tasks-table.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from '@features/dashboard/dashboard-routing.module';
import { WeatherComponent } from '@features/dashboard/components/weather/weather.component';
import { TransactionsTableComponent } from '@features/dashboard/components/transactions-table/transactions-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateTaskComponent,
    TasksTableComponent,
    TransactionsTableComponent,
    WeatherComponent,
  ],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
