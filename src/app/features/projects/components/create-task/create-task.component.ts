import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CreateTaskComponent {
  protected form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private dialogRef: MatDialogRef<CreateTaskComponent>) {}

  protected get title(): FormControl {
    return this.form.get('title') as FormControl;
  }
  protected get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close({ title: this.title.value!, description: this.description.value! });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
