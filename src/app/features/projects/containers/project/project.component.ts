import { ChangeDetectionStrategy, Component, HostListener, Signal, signal } from '@angular/core';
import { ProjectService } from '@features/projects/services/project.service';
import { TaskService } from '@features/projects/services/task.service';
import { Project } from '@model/project.model';
import { Task, TaskStatus } from '@model/task.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProjectComponent {
  protected project: Signal<Project>;
  protected projects: ProjectService['projects'];
  protected projectsLoading: ProjectService['projectsLoading'];
  protected menuOpen = signal(false);
  protected operationLoading = signal(false);

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) {
    this.project = this.projectService.project as Signal<Project>;
    this.projects = this.projectService.projects;
    this.projectsLoading = this.projectService.projectsLoading;
  }

  protected get isLoading(): boolean {
    return this.projectsLoading() || this.operationLoading();
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
    this.run(this.taskService.addTask$());
  }

  protected onTaskEdit(task: Task): void {
    this.run(this.taskService.editTask$(task));
  }

  protected onTaskMove(taskId: number, status: TaskStatus): void {
    this.run(this.taskService.moveTask$(taskId, status));
  }

  protected onTaskDelete(task: Task): void {
    this.run(this.taskService.removeTask$(task));
  }

  protected openCreateProject(): void {
    this.run(this.projectService.createProject$());
  }

  protected openEditProject(): void {
    this.run(this.projectService.editProject$());
  }

  protected deleteProject(): void {
    this.menuOpen.set(false);
    this.run(this.projectService.deleteProject$());
  }

  private run(obs$: Observable<unknown>): void {
    this.operationLoading.set(true);
    obs$.pipe(finalize(() => this.operationLoading.set(false))).subscribe();
  }
}
