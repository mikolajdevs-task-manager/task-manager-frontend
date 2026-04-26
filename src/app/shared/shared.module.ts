import { AsyncPipe, JsonPipe, LowerCasePipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { FormatDateTimePipe } from '@shared/pipe/format-date-time.pipe';

const materialModules = [
  MatAccordion,
  MatExpansionModule,
  MatTable,
  MatColumnDef,
  MatCell,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatHeaderCellDef,
  MatCellDef,
  MatHeaderRowDef,
  MatRowDef,
  MatCheckbox,
  MatIcon,
  MatButton,
  MatInput,
  ReactiveFormsModule,
  MatFormField,
  MatLabel,
  MatCard,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
  MatCardHeader,
  MatIconButton,
  MatProgressSpinner,
  MatError,
  MatTooltip
];

@NgModule({
  declarations: [FormatDateTimePipe],
  imports: [...materialModules, AsyncPipe, NgIf, NgTemplateOutlet, JsonPipe, LowerCasePipe, TranslateModule],
  exports: [...materialModules, AsyncPipe, NgIf, NgTemplateOutlet, JsonPipe, LowerCasePipe, FormatDateTimePipe, TranslateModule]
})
export class SharedModule {}
