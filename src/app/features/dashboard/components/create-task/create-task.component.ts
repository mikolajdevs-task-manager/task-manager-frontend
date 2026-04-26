import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '@model/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CreateTaskComponent {
  @Output() public onCreate = new EventEmitter<Task>();

  protected form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  });

  protected get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  protected get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  @HostListener('keyup.enter')
  protected onEnter() {
    this.create();
  }

  protected create(): void {
    if (this.form.valid) {
      const task = {
        title: this.title.value,
        description: this.description.value,
        done: false
      } as Task;
      this.form.reset();
      this.onCreate.emit(task);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
