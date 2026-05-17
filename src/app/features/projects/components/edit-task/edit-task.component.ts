import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskStatus } from '@model/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class EditTaskComponent {
  protected readonly id: number;
  protected readonly createdAt: string;
  protected readonly updatedAt: string;
  protected readonly statuses = Object.values(TaskStatus);

  protected form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl<TaskStatus>(TaskStatus.TODO, [Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) task: Task
  ) {
    this.id = task.id;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.form.setValue({ title: task.title, description: task.description, status: task.status });
  }

  protected get title(): FormControl {
    return this.form.get('title') as FormControl;
  }
  protected get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
  protected get status(): FormControl {
    return this.form.get('status') as FormControl;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close({
      title: this.title.value!,
      description: this.description.value!,
      status: this.status.value!
    });
  }

  protected statusLabel(s: TaskStatus): string {
    if (s === TaskStatus.TODO) return 'To do';
    if (s === TaskStatus.IN_PROGRESS) return 'In progress';
    return 'Done';
  }

  protected statusDot(s: TaskStatus): string {
    if (s === TaskStatus.TODO) return 'var(--q-todo-dot)';
    if (s === TaskStatus.IN_PROGRESS) return 'var(--q-prog-dot)';
    return 'var(--q-done-dot)';
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
