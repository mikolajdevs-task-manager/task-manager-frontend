import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { Drawer } from '@shared/components/drawer/drawer';
import { UserDialogComponent } from '@shared/components/user-dialog/user-dialog.component';

const components = [Drawer, ConfirmDialogComponent, UserDialogComponent];
const materialModules = [MatIcon, MatProgressSpinner, MatTooltip, MatDialogModule];
const ngModules = [AsyncPipe, DatePipe, NgIf, FormsModule, ReactiveFormsModule, TranslateModule];

@NgModule({
  declarations: [...components],
  imports: [...materialModules, ...ngModules],
  exports: [...components, ...materialModules, ...ngModules]
})
export class SharedModule {}
