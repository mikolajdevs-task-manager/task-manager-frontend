import { Task } from './task.model';

export interface ProjectSummary {
  id: number;
  name: string;
  tasksCount: number;
}

export interface Project extends ProjectSummary {
  description: string;
  ownerId: string;
  tasks: Task[];
}
