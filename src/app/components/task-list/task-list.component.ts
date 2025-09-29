import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  loading: boolean = true;
  error: string | null = null;
  private tasksSubscription?: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  private loadTasks(): void {
    this.loading = true;
    this.error = null;

    this.tasksSubscription = this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks.sort((a, b) => {
          // Ordenar por fecha de creación (más recientes primero)
          const dateA = this.getTimestamp(a.createdAt);
          const dateB = this.getTimestamp(b.createdAt);
          return dateB - dateA;
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar las tareas:', error);
        this.error = 'Error al cargar las tareas. Por favor, intenta nuevamente.';
        this.loading = false;
      }
    });
  }

  async onDeleteTask(taskId: string): Promise<void> {
    try {
      await this.taskService.deleteTask(taskId);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      this.error = 'Error al eliminar la tarea. Por favor, intenta nuevamente.';
    }
  }

  async onToggleComplete(event: { id: string, completed: boolean }): Promise<void> {
    try {
      await this.taskService.toggleTaskCompletion(event.id, event.completed);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      this.error = 'Error al actualizar la tarea. Por favor, intenta nuevamente.';
    }
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id!;
  }

  reloadTasks(): void {
    // Reiniciar la carga de tareas
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
    this.loadTasks();
  }

  private getTimestamp(date: any): number {
    if (!date) return 0;
    
    // Manejar Timestamps de Firestore
    if (date && typeof date.toDate === 'function') {
      return date.toDate().getTime();
    } else if (date instanceof Date) {
      return date.getTime();
    } else if (typeof date === 'string' || typeof date === 'number') {
      return new Date(date).getTime();
    }
    
    return 0;
  }
}
