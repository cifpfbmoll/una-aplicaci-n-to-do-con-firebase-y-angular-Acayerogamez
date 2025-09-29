import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  collectionData, 
  doc, 
  deleteDoc, 
  updateDoc,
  DocumentReference,
  DocumentData 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksCollection;

  constructor(private firestore: Firestore) {
    this.tasksCollection = collection(this.firestore, 'tasks');
  }

  // Obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  // Crear una nueva tarea
  async createTask(taskData: CreateTaskRequest): Promise<DocumentReference<DocumentData>> {
    const newTask = {
      title: taskData.title,
      description: taskData.description || '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return await addDoc(this.tasksCollection, newTask);
  }

  // Actualizar una tarea
  async updateTask(taskId: string, updates: UpdateTaskRequest): Promise<void> {
    const taskDoc = doc(this.firestore, 'tasks', taskId);
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    return await updateDoc(taskDoc, updateData);
  }

  // Eliminar una tarea
  async deleteTask(taskId: string): Promise<void> {
    const taskDoc = doc(this.firestore, 'tasks', taskId);
    return await deleteDoc(taskDoc);
  }

  // Marcar tarea como completada/no completada
  async toggleTaskCompletion(taskId: string, completed: boolean): Promise<void> {
    return await this.updateTask(taskId, { completed });
  }
}