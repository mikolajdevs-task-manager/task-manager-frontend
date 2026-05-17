import { Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '@features/projects/components/create-task/create-task.component';
import { EditTaskComponent } from '@features/projects/components/edit-task/edit-task.component';
import { ProjectService } from '@features/projects/services/project.service';
import { TaskApiService } from '@features/projects/services/task-api.service';
import { Task, TaskStatus } from '@model/task.model';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { EMPTY, filter, finalize, first, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public readonly loading = signal(false);

  constructor(
    private api: TaskApiService,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  public addTask$(): Observable<Task> {
    const project = this.projectService.project();
    if (!project) return EMPTY;
    return this.dialog
      .open(CreateTaskComponent, { autoFocus: '.tm-input' })
      .afterClosed()
      .pipe(
        first(),
        filter((response): response is { title: string; description: string } => !!response),
        tap(() => this.loading.set(true)),
        switchMap(({ title, description }) => this.api.addTask$(project.id, title, description)),
        tap((task) => this.projectService.applyTaskUpdate((tasks) => [...tasks, task])),
        finalize(() => this.loading.set(false))
      );
  }

  public editTask$(task: Task): Observable<Task> {
    const project = this.projectService.project();
    if (!project) return EMPTY;
    return this.dialog
      .open(EditTaskComponent, { autoFocus: '.tm-input', data: task })
      .afterClosed()
      .pipe(
        first(),
        filter((response): response is { title: string; description: string; status: TaskStatus } => !!response),
        tap(() => this.loading.set(true)),
        switchMap((changes) => this.api.updateTask$(project.id, task.id, changes)),
        tap((updated) => this.projectService.applyTaskUpdate((tasks) => tasks.map((t) => (t.id === updated.id ? updated : t)))),
        finalize(() => this.loading.set(false))
      );
  }

  public moveTask$(taskId: number, status: TaskStatus): Observable<Task> {
    const project = this.projectService.project();
    if (!project) return EMPTY;
    this.loading.set(true);
    return this.api.updateTask$(project.id, taskId, { status }).pipe(
      tap((updated) => this.projectService.applyTaskUpdate((tasks) => tasks.map((t) => (t.id === updated.id ? updated : t)))),
      finalize(() => this.loading.set(false))
    );
  }

  public removeTask$(task: Task): Observable<void> {
    const project = this.projectService.project();
    if (!project) return EMPTY;
    return this.dialog
      .open(ConfirmDialogComponent, {
        autoFocus: '.tm-btn-danger',
        data: {
          title: 'Delete this task?',
          message: `You're about to delete "${task.title}". This cannot be undone.`,
          confirmLabel: 'Delete task',
          kind: 'task'
        }
      })
      .afterClosed()
      .pipe(
        first(),
        filter((confirmed): confirmed is true => confirmed === true),
        tap(() => this.loading.set(true)),
        switchMap(() => this.api.removeTask$(project.id, task.id)),
        tap(() => this.projectService.applyTaskUpdate((tasks) => tasks.filter((t) => t.id !== task.id))),
        finalize(() => this.loading.set(false))
      );
  }
}
