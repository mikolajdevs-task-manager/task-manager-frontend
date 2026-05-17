import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Task, TaskStatus } from '@model/task.model';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TasksTableComponent {
  @Input() tasks: Task[] = [];
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Task>();
  @Output() move = new EventEmitter<{ task: Task; status: TaskStatus }>();
  @Output() delete = new EventEmitter<Task>();

  protected readonly TaskStatus = TaskStatus;
  protected readonly selectedTask = signal<Task | null>(null);

  protected readonly columns: { status: TaskStatus; label: string }[] = [
    { status: TaskStatus.TODO, label: 'To Do' },
    { status: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { status: TaskStatus.DONE, label: 'Done' }
  ];

  protected tasksFor(status: TaskStatus): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  protected prevStatus(status: TaskStatus): TaskStatus | null {
    if (status === TaskStatus.IN_PROGRESS) return TaskStatus.TODO;
    if (status === TaskStatus.DONE) return TaskStatus.IN_PROGRESS;
    return null;
  }

  protected nextStatus(status: TaskStatus): TaskStatus | null {
    if (status === TaskStatus.TODO) return TaskStatus.IN_PROGRESS;
    if (status === TaskStatus.IN_PROGRESS) return TaskStatus.DONE;
    return null;
  }

  protected selectTask(task: Task): void {
    this.selectedTask.set(task);
  }

  protected closeDetail(): void {
    this.selectedTask.set(null);
  }

  protected moveFromDetail(task: Task, status: TaskStatus): void {
    this.move.emit({ task, status });
    this.selectedTask.set(null);
  }

  protected editFromDetail(task: Task): void {
    this.edit.emit(task);
    this.selectedTask.set(null);
  }

  protected deleteFromDetail(task: Task): void {
    this.delete.emit(task);
    this.selectedTask.set(null);
  }

  protected dotColor(status: TaskStatus): string {
    if (status === TaskStatus.TODO) return 'var(--q-todo-dot)';
    if (status === TaskStatus.IN_PROGRESS) return 'var(--q-prog-dot)';
    return 'var(--q-done-dot)';
  }

  protected statusLabel(status: TaskStatus): string {
    if (status === TaskStatus.TODO) return 'To Do';
    if (status === TaskStatus.IN_PROGRESS) return 'In Progress';
    return 'Done';
  }
}
