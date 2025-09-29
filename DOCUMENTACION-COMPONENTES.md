# 📚 Documentación de Componentes - Guía para Programadores Junior

## 🎯 Arquitectura de Componentes Explicada

---

## 1. 🏠 `src/app/app.component.*` - Componente Raíz (Layout Principal)

### ¿Qué es el Componente Raíz?
Es el **componente principal** de tu aplicación, como la **estructura de una casa**. Todos los demás componentes viven dentro de él.

### 📄 **app.component.ts - La Lógica**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',           // Cómo se llama en HTML: <app-root>
  standalone: true,               // Componente independiente (Angular 18)
  imports: [RouterOutlet, TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Título de la aplicación
  title = 'Lista de Tareas - Firebase & Angular';

  // Método que se ejecuta cuando se agrega una tarea
  onTaskAdded(): void {
    // La lista se actualizará automáticamente gracias a Firebase
    console.log('Nueva tarea agregada');
  }
}
```

**¿Por qué `imports`?**
- En Angular 18, los componentes son **standalone** (independientes)
- Necesitas **importar** otros componentes para usarlos
- Es como decir: "Voy a usar TaskFormComponent y TaskListComponent aquí"

### 🎨 **app.component.html - La Estructura**
```html
<div class="app-container">
  <!-- HEADER: Título y descripción -->
  <header class="app-header">
    <h1>{{ title }}</h1>  <!-- Muestra el título del componente -->
    <p>Gestiona tus tareas de manera eficiente</p>
  </header>

  <!-- MAIN: Contenido principal -->
  <main class="app-main">
    <!-- SECCIÓN DEL FORMULARIO -->
    <div class="form-section">
      <app-task-form (taskAdded)="onTaskAdded()"></app-task-form>
    </div>

    <!-- SECCIÓN DE LA LISTA -->
    <div class="list-section">
      <app-task-list></app-task-list>
    </div>
  </main>
</div>

<!-- Para futuras rutas -->
<router-outlet />
```

**¿Qué significa `(taskAdded)="onTaskAdded()"`?**
- Es un **event binding** (escuchar eventos)
- Cuando TaskFormComponent emite el evento `taskAdded`
- Se ejecuta el método `onTaskAdded()` del AppComponent
- Es como decir: "Cuando me avises que agregaste una tarea, ejecuto esto"

---

## 2. 📝 `src/app/components/task-form/` - Formulario de Tareas

### ¿Qué hace este componente?
Es el **formulario** donde el usuario escribe nuevas tareas. Como una **hoja de papel** donde anotas lo que tienes que hacer.

### 📄 **task-form.component.ts - La Lógica del Formulario**
```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CreateTaskRequest } from '../../models/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],  // FormsModule para [(ngModel)]
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  // EVENTO que emite cuando se agrega una tarea
  @Output() taskAdded = new EventEmitter<void>();

  // PROPIEDADES del formulario
  taskTitle: string = '';           // Lo que escribe el usuario
  taskDescription: string = '';     // Descripción opcional
  isSubmitting: boolean = false;    // Para mostrar "Cargando..."

  constructor(private taskService: TaskService) {}

  // MÉTODO principal: Enviar formulario
  async onSubmit(): Promise<void> {
    // Validación: El título es obligatorio
    if (!this.taskTitle.trim()) {
      return; // No hace nada si está vacío
    }

    this.isSubmitting = true; // Mostrar estado de carga

    try {
      // Crear objeto con los datos del formulario
      const newTask: CreateTaskRequest = {
        title: this.taskTitle.trim(),        // Sin espacios extra
        description: this.taskDescription.trim()
      };

      // Guardar en Firebase
      await this.taskService.createTask(newTask);
      
      // Limpiar formulario después de guardar
      this.taskTitle = '';
      this.taskDescription = '';
      
      // Avisar al componente padre que se agregó una tarea
      this.taskAdded.emit();
      
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    } finally {
      this.isSubmitting = false; // Quitar estado de carga
    }
  }

  // MÉTODO para cancelar/limpiar
  onCancel(): void {
    this.taskTitle = '';
    this.taskDescription = '';
  }
}
```

**Conceptos Clave:**
- **`@Output()`**: Para enviar información al componente padre
- **`EventEmitter`**: Como un megáfono que grita "¡Ya terminé!"
- **`async/await`**: Espera a que Firebase guarde la tarea
- **`try/catch/finally`**: Manejo de errores profesional

---

## 3. 📋 `src/app/components/task-list/` - Lista de Tareas

### ¿Qué hace este componente?
Muestra **todas las tareas** del usuario, con estadísticas y diferentes estados (cargando, error, vacío).

### 📄 **task-list.component.ts - La Lógica de la Lista**
```typescript
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
  // PROPIEDADES de estado
  tasks: Task[] = [];                    // Lista de tareas
  loading: boolean = true;               // ¿Está cargando?
  error: string | null = null;           // ¿Hay algún error?
  private tasksSubscription?: Subscription; // Suscripción a Firebase

  constructor(private taskService: TaskService) {}

  // Se ejecuta cuando el componente se crea
  ngOnInit(): void {
    this.loadTasks();
  }

  // Se ejecuta cuando el componente se destruye
  ngOnDestroy(): void {
    // IMPORTANTE: Cancelar suscripción para evitar memory leaks
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  // MÉTODO para cargar tareas desde Firebase
  private loadTasks(): void {
    this.loading = true;
    this.error = null;

    // Suscribirse a cambios en tiempo real
    this.tasksSubscription = this.taskService.getTasks().subscribe({
      next: (tasks) => {
        // Ordenar tareas: más recientes primero
        this.tasks = tasks.sort((a, b) => {
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

  // MÉTODO para eliminar tarea
  async onDeleteTask(taskId: string): Promise<void> {
    try {
      await this.taskService.deleteTask(taskId);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      this.error = 'Error al eliminar la tarea. Por favor, intenta nuevamente.';
    }
  }

  // MÉTODO para cambiar estado completado
  async onToggleComplete(event: { id: string, completed: boolean }): Promise<void> {
    try {
      await this.taskService.toggleTaskCompletion(event.id, event.completed);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      this.error = 'Error al actualizar la tarea. Por favor, intenta nuevamente.';
    }
  }

  // GETTERS para estadísticas (se calculan automáticamente)
  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  // MÉTODO helper para manejar fechas de Firebase
  private getTimestamp(date: any): number {
    if (!date) return 0;
    
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
```

**Conceptos Importantes:**
- **`OnInit/OnDestroy`**: Ciclo de vida del componente
- **`Subscription`**: Conexión con Firebase que hay que cerrar
- **`subscribe()`**: Escuchar cambios en tiempo real
- **`get`**: Propiedades calculadas automáticamente

---

## 4. 📄 `src/app/components/task-item/` - Item Individual de Tarea

### ¿Qué hace este componente?
Representa **una sola tarea** en la lista. Como una **tarjeta** con la información y botones de acción.

### 📄 **task-item.component.ts - La Lógica del Item**
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  // ENTRADA: Recibe la tarea desde el componente padre
  @Input() task!: Task;
  
  // SALIDAS: Eventos que emite hacia el componente padre
  @Output() deleteTask = new EventEmitter<string>();
  @Output() toggleComplete = new EventEmitter<{ id: string, completed: boolean }>();

  // MÉTODO para eliminar tarea
  onDelete(): void {
    // Confirmación antes de eliminar
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.deleteTask.emit(this.task.id!); // Emite el ID al padre
    }
  }

  // MÉTODO para cambiar estado completado
  onToggleComplete(): void {
    this.toggleComplete.emit({
      id: this.task.id!,
      completed: !this.task.completed  // Cambia al estado opuesto
    });
  }

  // MÉTODO para formatear fechas
  formatDate(date: any): string {
    if (!date) return '';
    
    let taskDate: Date;
    
    // Manejar diferentes tipos de fecha
    if (date && typeof date.toDate === 'function') {
      taskDate = date.toDate(); // Timestamp de Firestore
    } else if (date instanceof Date) {
      taskDate = date; // Date normal
    } else if (typeof date === 'string' || typeof date === 'number') {
      taskDate = new Date(date); // String o número
    } else {
      return ''; // No se puede formatear
    }
    
    // Verificar que la fecha sea válida
    if (isNaN(taskDate.getTime())) {
      return '';
    }
    
    // Formatear en español
    return taskDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
```

**Conceptos de Comunicación:**
- **`@Input()`**: Recibe datos del componente padre
- **`@Output()`**: Envía eventos al componente padre
- **`!`**: Le dice a TypeScript "confía en mí, esto tendrá valor"
- **`emit()`**: Envía información hacia arriba

---

## 🔄 **Flujo de Comunicación Entre Componentes**

### Diagrama de Comunicación:
```
AppComponent (Raíz)
    ↓ Datos
    ↑ Eventos
    ├── TaskFormComponent
    │   └── Emite: (taskAdded)
    │
    └── TaskListComponent
        ↓ Datos [@Input]
        ↑ Eventos [@Output]
        └── TaskItemComponent (múltiples)
            └── Emite: (deleteTask), (toggleComplete)
```

### Flujo Completo de una Acción:
```
1. Usuario hace clic en "Eliminar" en TaskItemComponent
2. TaskItemComponent emite evento deleteTask
3. TaskListComponent recibe el evento y llama taskService.deleteTask()
4. Firebase elimina la tarea
5. Observable de TaskListComponent recibe la actualización
6. La UI se actualiza automáticamente
```

---

## 🎨 **Patrones de Diseño Utilizados**

### 1. **Container/Presentational Pattern**
- **TaskListComponent** = Container (maneja lógica)
- **TaskItemComponent** = Presentational (solo muestra datos)

### 2. **Event-Driven Architecture**
- Los componentes se comunican mediante eventos
- Bajo acoplamiento, alta cohesión

### 3. **Reactive Programming**
- Observable streams para datos en tiempo real
- Manejo automático de actualizaciones

---

## 🎯 **Mejores Prácticas Implementadas**

### ✅ **Separación de Responsabilidades**
- Cada componente tiene un propósito específico
- Lógica de negocio en servicios, no en componentes

### ✅ **Manejo de Estados**
- Estados claros: loading, error, success
- Feedback visual para el usuario

### ✅ **Comunicación Limpia**
- Input/Output bien definidos
- Eventos descriptivos

### ✅ **Manejo de Memoria**
- Unsubscribe en OnDestroy
- Prevención de memory leaks

### ✅ **UX/UI**
- Confirmaciones para acciones destructivas
- Estados de carga visibles
- Mensajes de error informativos

---

## 🛠️ **Comandos para Generar Componentes**

```bash
# Generar componente con Angular CLI
ng generate component components/mi-componente

# Generar componente standalone
ng generate component components/mi-componente --standalone

# Generar con archivos específicos
ng generate component components/mi-componente --style=scss --skip-tests
```

---

## 🎓 **Conceptos Clave para Recordar**

1. **Componentes** = Piezas reutilizables de UI
2. **@Input/@Output** = Comunicación entre componentes
3. **EventEmitter** = Para enviar eventos hacia arriba
4. **OnInit/OnDestroy** = Ciclo de vida del componente
5. **Standalone** = Componentes independientes (Angular 18)
6. **Observable** = Stream de datos en tiempo real
7. **Unsubscribe** = Limpiar suscripciones para evitar memory leaks

¡Con esto ya entiendes cómo crear y organizar componentes de forma profesional! 🚀
