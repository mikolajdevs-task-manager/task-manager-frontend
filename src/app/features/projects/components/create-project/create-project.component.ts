import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CreateProjectComponent {
  protected form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private dialogRef: MatDialogRef<CreateProjectComponent>) {}

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
