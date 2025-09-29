export interface Task {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: any; // Puede ser Date o Timestamp de Firestore
  updatedAt: any; // Puede ser Date o Timestamp de Firestore
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}
