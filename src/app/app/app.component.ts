import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ProjectService } from '@features/projects/services/project.service';
import { IdentityClaims } from '@model/auth.model';
import { Project, ProjectSummary } from '@model/project.model';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AppComponent {
  private projectService = inject(ProjectService);
  private translateService = inject(TranslateService);
  private oauthService = inject(OAuthService);

  protected readonly projects: Signal<ProjectSummary[]> = this.projectService.projects;
  protected readonly project: Signal<Project | null> = this.projectService.project;
  protected readonly projectsLoading: Signal<boolean> = this.projectService.projectsLoading;

  protected get isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  constructor() {}

  public ngOnInit(): void {
    this.translateService.setFallbackLang('en');
    this.translateService.use('en');
  }

  protected onProjectCreate(): void {
    this.projectService.createProject$().subscribe();
  }

  protected onProjectChange(project: ProjectSummary): void {
    this.projectService.selectProject(project);
  }

  protected get identityClaims(): IdentityClaims {
    return this.oauthService.getIdentityClaims() as IdentityClaims;
  }

  protected logOut(): void {
    this.oauthService.logOut();
  }
}
