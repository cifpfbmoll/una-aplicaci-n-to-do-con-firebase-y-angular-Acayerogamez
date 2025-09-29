/**
 * TaskFormComponent - Formulario para crear nuevas tareas
 * 
 * Este componente maneja la creación de nuevas tareas en la aplicación TODO.
 * Proporciona un formulario con validación básica, estados de carga,
 * y comunicación con el componente padre mediante eventos.
 */

// Importaciones principales de Angular
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CreateTaskRequest } from '../../models/task.interface';

@Component({
  selector: 'app-task-form',              // Nombre del tag HTML: <app-task-form>
  standalone: true,                       // Componente independiente (Angular 18+)
  imports: [CommonModule, FormsModule],   // Módulos necesarios para el componente
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  
  /**
   * Evento que se emite cuando se agrega exitosamente una nueva tarea
   * El componente padre puede escuchar este evento para actualizar la UI
   */
  @Output() taskAdded = new EventEmitter<void>();

  /** Título de la tarea ingresado por el usuario */
  taskTitle: string = '';
  
  /** Descripción opcional de la tarea */
  taskDescription: string = '';
  
  /** Indica si el formulario se está enviando actualmente */
  isSubmitting: boolean = false;

  /**
   * Constructor - Inyecta el TaskService para operaciones con Firebase
   */
  constructor(private taskService: TaskService) {}

  /**
   * Maneja el envío del formulario para crear una nueva tarea
   * 
   * Flujo: Validación → Estado de carga → Crear tarea → Limpiar formulario → Emitir evento
   */
  async onSubmit(): Promise<void> {
    // Validación: el título es obligatorio
    if (!this.taskTitle.trim()) {
      return; // Salida temprana si no hay título válido
    }

    // Activar estado de carga (botón muestra "Cargando...")
    this.isSubmitting = true;

    try {
      // Crear objeto de tarea con datos limpios
      const newTask: CreateTaskRequest = {
        title: this.taskTitle.trim(),           // Título sin espacios extra
        description: this.taskDescription.trim() // Descripción sin espacios extra
      };

      // Guardar tarea en Firebase
      await this.taskService.createTask(newTask);
      
      // Limpiar formulario después del éxito
      this.taskTitle = '';
      this.taskDescription = '';
      
      // Notificar al componente padre que se agregó una tarea
      this.taskAdded.emit();
      
    } catch (error) {
      // Registrar error en consola para debugging
      console.error('Error al crear la tarea:', error);
      
      // TODO: Mostrar mensaje de error al usuario
      
    } finally {
      // Siempre desactivar estado de carga (éxito o error)
      this.isSubmitting = false;
    }
  }

  /**
   * Limpia el formulario sin guardar
   * Se ejecuta cuando el usuario hace clic en "Cancelar"
   */
  onCancel(): void {
    this.taskTitle = '';       // Limpiar título
    this.taskDescription = ''; // Limpiar descripción
  }
}
