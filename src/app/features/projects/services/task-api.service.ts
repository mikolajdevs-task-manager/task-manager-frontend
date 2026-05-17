import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '@model/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private readonly baseUrl = '/api/projects';

  constructor(private http: HttpClient) {}

  public addTask$(projectId: number, title: string, description: string): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${projectId}/tasks`, { title, description });
  }

  public updateTask$(
    projectId: number,
    taskId: number,
    changes: { title?: string; description?: string; status?: TaskStatus }
  ): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${projectId}/tasks/${taskId}`, changes);
  }

  public removeTask$(projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${projectId}/tasks/${taskId}`);
  }
}
