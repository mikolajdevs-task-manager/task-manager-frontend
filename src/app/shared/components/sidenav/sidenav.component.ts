import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IdentityClaims } from '@model/auth.model';
import { ProjectSummary } from '@model/project.model';
import { UserDialogComponent } from '@shared/components/user-dialog/user-dialog.component';
import { getLocalStorage, setLocalStorage } from '@shared/util/localStorage.utils';

const SIDENAV_KEY = 'SIDENAV';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class Sidenav {
  public identityClaims = input.required<IdentityClaims>();
  public projects = input.required<ProjectSummary[]>();
  public projectsLoading = input.required<boolean>();
  public project = input.required<ProjectSummary | null>();

  public logOut = output<void>();
  public projectChange = output<ProjectSummary>();
  public projectCreate = output<void>();

  protected isOpened = signal<boolean>(getLocalStorage<boolean>(SIDENAV_KEY) ?? true);

  constructor(private dialog: MatDialog) {}

  public toggle(): void {
    const isOpened = !this.isOpened();
    this.isOpened.set(isOpened);
    setLocalStorage(SIDENAV_KEY, isOpened);
  }

  public get opened(): boolean {
    return this.isOpened();
  }

  protected get userInitial(): string {
    const name = this.identityClaims().name || this.identityClaims().preferred_username || '';
    return name.charAt(0).toUpperCase();
  }

  protected openUserDialog(): void {
    this.dialog
      .open(UserDialogComponent, {
        autoFocus: false,
        data: this.identityClaims()
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'logout') this.logOut.emit();
      });
  }
}
