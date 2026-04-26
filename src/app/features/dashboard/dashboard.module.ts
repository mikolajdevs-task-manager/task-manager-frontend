import { NgModule } from '@angular/core';
import { CreateTaskComponent } from '@features/dashboard/components/create-task/create-task.component';
import { TasksTableComponent } from '@features/dashboard/components/tasks-table/tasks-table.component';
import { TransactionsTableComponent } from '@features/dashboard/components/transactions-table/transactions-table.component';
import { WeatherComponent } from '@features/dashboard/components/weather/weather.component';
import { DashboardComponent } from '@features/dashboard/containers/dashboard/dashboard.component';
import { DashboardRoutingModule } from '@features/dashboard/dashboard-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, CreateTaskComponent, TasksTableComponent, TransactionsTableComponent, WeatherComponent],
  imports: [SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
