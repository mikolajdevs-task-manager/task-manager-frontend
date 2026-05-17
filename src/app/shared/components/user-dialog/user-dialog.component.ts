import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IdentityClaims } from '@model/auth.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class UserDialogComponent {
  protected get initial(): string {
    const n = this.data.name || this.data.preferred_username || '';
    return n.charAt(0).toUpperCase();
  }

  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IdentityClaims
  ) {}

  protected close(): void {
    this.dialogRef.close();
  }
  protected logout(): void {
    this.dialogRef.close('logout');
  }
}
