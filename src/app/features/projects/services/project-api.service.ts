import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, ProjectSummary } from '@model/project.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {
  private readonly apiUrl = `${environment.apiBaseUrl}/api/projects`;

  constructor(private http: HttpClient) {}

  public getProjects$(): Observable<ProjectSummary[]> {
    return this.http.get<ProjectSummary[]>(this.apiUrl);
  }

  public getProject$(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  public createProject$(name: string, description: string): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, { name, description });
  }

  public updateProject$(id: number, changes: { name?: string; description?: string }): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${id}`, changes);
  }

  public deleteProject$(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
