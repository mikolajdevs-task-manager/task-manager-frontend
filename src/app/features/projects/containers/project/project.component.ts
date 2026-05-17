import { ChangeDetectionStrategy, Component, HostListener, Signal, signal } from '@angular/core';
import { ProjectService } from '@features/projects/services/project.service';
import { TaskService } from '@features/projects/services/task.service';
import { Project } from '@model/project.model';
import { Task, TaskStatus } from '@model/task.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProjectComponent {
  protected project: Signal<Project>;
  protected menuOpen = signal(false);

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) {
    this.project = this.projectService.project as Signal<Project>;
  }

  protected toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen.update((v) => !v);
  }

  @HostListener('document:click')
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected onTaskCreate(): void {
    this.taskService.addTask$().subscribe();
  }

  protected onTaskEdit(task: Task): void {
    this.taskService.editTask$(task).subscribe();
  }

  protected onTaskMove(taskId: number, status: TaskStatus): void {
    this.taskService.moveTask$(taskId, status).subscribe();
  }

  protected onTaskDelete(task: Task): void {
    this.taskService.removeTask$(task).subscribe();
  }

  protected openCreateProject(): void {
    this.projectService.createProject$().subscribe();
  }

  protected openEditProject(): void {
    this.projectService.editProject$().subscribe();
  }

  protected deleteProject(): void {
    this.menuOpen.set(false);
    this.projectService.deleteProject$().subscribe();
  }
}
