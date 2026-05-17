import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '@model/project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class EditProjectComponent {
  protected readonly id: number;
  protected readonly ownerId: string;
  protected readonly tasksCount: number;

  protected form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) project: Project
  ) {
    this.id = project.id;
    this.ownerId = project.ownerId;
    this.tasksCount = project.tasks.length;
    this.form.setValue({ name: project.name, description: project.description });
  }

  protected get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  protected get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close({ name: this.name.value!, description: this.description.value! });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
