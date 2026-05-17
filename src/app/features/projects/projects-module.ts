import { NgModule } from '@angular/core';
import { CreateProjectComponent } from '@features/projects/components/create-project/create-project.component';
import { CreateTaskComponent } from '@features/projects/components/create-task/create-task.component';
import { EditProjectComponent } from '@features/projects/components/edit-project/edit-project.component';
import { EditTaskComponent } from '@features/projects/components/edit-task/edit-task.component';
import { TasksTableComponent } from '@features/projects/components/tasks-table/tasks-table.component';
import { ProjectBoardComponent } from '@features/projects/containers/project-board/project-board.component';
import { ProjectsRoutingModule } from '@features/projects/projects-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ProjectBoardComponent,
    CreateProjectComponent,
    CreateTaskComponent,
    EditProjectComponent,
    EditTaskComponent,
    TasksTableComponent
  ],
  imports: [SharedModule, ProjectsRoutingModule]
})
export class ProjectsModule {}
