import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmLabel?: string;
  kind?: 'task' | 'project';
  taskCount?: number;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  protected get eyebrow(): string {
    return this.data.kind === 'project' ? 'Project' : 'Task';
  }

  protected confirm(): void {
    this.dialogRef.close(true);
  }
  protected cancel(): void {
    this.dialogRef.close(false);
  }
}
