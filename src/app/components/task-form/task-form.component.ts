import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CreateTaskRequest } from '../../models/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<void>();

  taskTitle: string = '';
  taskDescription: string = '';
  isSubmitting: boolean = false;

  constructor(private taskService: TaskService) {}

  async onSubmit(): Promise<void> {
    if (!this.taskTitle.trim()) {
      return;
    }

    this.isSubmitting = true;

    try {
      const newTask: CreateTaskRequest = {
        title: this.taskTitle.trim(),
        description: this.taskDescription.trim()
      };

      await this.taskService.createTask(newTask);
      
      // Limpiar formulario
      this.taskTitle = '';
      this.taskDescription = '';
      
      // Emitir evento para notificar que se agregó una tarea
      this.taskAdded.emit();
      
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    this.taskTitle = '';
    this.taskDescription = '';
  }
}
