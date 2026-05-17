import { effect, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '@features/projects/components/create-project/create-project.component';
import { EditProjectComponent } from '@features/projects/components/edit-project/edit-project.component';
import { ProjectApiService } from '@features/projects/services/project-api.service';
import { Project, ProjectSummary } from '@model/project.model';
import { Task } from '@model/task.model';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { EMPTY, filter, finalize, first, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _projects = signal<ProjectSummary[]>([]);
  private _project = signal<Project | null>(null);
  private _projectsLoading = signal<boolean>(false);

  public readonly projects = this._projects.asReadonly();
  public readonly project = this._project.asReadonly();
  public readonly projectsLoading = this._projectsLoading.asReadonly();
  public readonly operationLoading = signal(false);

  constructor(
    private api: ProjectApiService,
    private dialog: MatDialog
  ) {
    this.loadProjects();
    effect(() => {
      const projects = this._projects();
      if (!this._project() && projects.length > 0) {
        this.loadProject(projects[0].id);
      }
    });
  }

  public loadProjects(): void {
    this._projectsLoading.set(true);
    this.api.getProjects$().subscribe({
      next: (projects) => {
        this._projects.set(projects);
        this._projectsLoading.set(false);
      },
      error: () => this._projectsLoading.set(false)
    });
  }

  public selectProject(project: ProjectSummary): void {
    this.loadProject(project.id);
  }

  public loadProject(id: number): void {
    this.api.getProject$(id).subscribe((project) => this._project.set(project));
  }

  public applyTaskUpdate(updater: (tasks: Task[]) => Task[]): void {
    this._project.update((p) => {
      if (!p) return p;
      const tasks = updater(p.tasks);
      this._projects.update((list) => list.map((s) => (s.id === p.id ? { ...s, tasksCount: tasks.length } : s)));
      return { ...p, tasks };
    });
  }

  public deleteProject$(): Observable<void> {
    const project = this._project();
    if (!project) return EMPTY;
    return this.dialog
      .open(ConfirmDialogComponent, {
        autoFocus: '.tm-btn-danger',
        data: {
          title: `Delete "${project.name}"?`,
          message: `You're about to delete this project. This cannot be undone.`,
          confirmLabel: 'Delete project',
          kind: 'project',
          taskCount: project.tasks.length
        }
      })
      .afterClosed()
      .pipe(
        first(),
        filter((confirmed): confirmed is true => confirmed === true),
        tap(() => this.operationLoading.set(true)),
        switchMap(() => this.api.deleteProject$(project.id)),
        tap(() => {
          this._projects.update((list) => list.filter((p) => p.id !== project.id));
          this._project.set(null);
          this.loadProjects();
        }),
        finalize(() => this.operationLoading.set(false))
      );
  }

  public editProject$(): Observable<Project> {
    const project = this._project();
    if (!project) return EMPTY;
    return this.dialog
      .open(EditProjectComponent, { autoFocus: '.tm-input', data: project })
      .afterClosed()
      .pipe(
        first(),
        filter((response): response is { name: string; description: string } => !!response),
        tap(() => this.operationLoading.set(true)),
        switchMap(({ name, description }) => this.api.updateProject$(project.id, { name, description })),
        tap((updated) => {
          this._project.set(updated);
          this.loadProjects();
        }),
        finalize(() => this.operationLoading.set(false))
      );
  }

  public createProject$(): Observable<Project> {
    return this.dialog
      .open(CreateProjectComponent, { autoFocus: '.tm-input' })
      .afterClosed()
      .pipe(
        first(),
        filter((response): response is { name: string; description: string } => !!response),
        tap(() => this.operationLoading.set(true)),
        switchMap(({ name, description }) => this.api.createProject$(name, description)),
        tap((project) => {
          this._project.set(project);
          this.loadProjects();
        }),
        finalize(() => this.operationLoading.set(false))
      );
  }
}
