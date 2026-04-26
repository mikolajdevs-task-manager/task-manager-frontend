import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from '@model/task.model';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TasksTableComponent {
  @Input() tasks: Task[] = [];
  @Output() doneChange = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<number>();

  displayedColumns: string[] = ['id', 'date', 'title', 'description', 'done', 'delete'];

  onDone(task: Task, done: boolean): void {
    this.doneChange.emit({ ...task, done });
  }

  onDelete(taskId: number): void {
    this.delete.emit(taskId);
  }
}
