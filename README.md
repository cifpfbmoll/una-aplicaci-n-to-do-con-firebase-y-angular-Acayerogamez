# Aplicación de Lista de Tareas (TO-DO App) con Angular y Firebase

Este proyecto es una aplicación web simple para gestionar una lista de tareas, desarrollada como parte de una tarea académica. La aplicación permite a los usuarios añadir, ver, marcar como completadas y eliminar tareas.

La principal característica de este proyecto es la integración con **Firebase Firestore** como base de datos en tiempo real, lo que permite que los datos persistan entre sesiones y se actualicen de forma instantánea.

## 🎬 Video de Funcionamiento

A continuación se encuentra el enlace a un video de demostración que muestra el ciclo completo de la aplicación: creación, visualización y eliminación de tareas, y cómo estos cambios se reflejan en tiempo real en la base de datos de Firebase.

**➡️ [Haz clic aquí para ver el video de demostración](https://drive.google.com/file/d/1IhbK8UUMWmZZx6dMVAdrMYFGZ1VfvKho/view?usp=drive_link)**

## 🚀 Tecnologías Utilizadas

*   **Angular:** Framework principal para el desarrollo del frontend.
*   **Firebase Firestore:** Base de datos NoSQL en la nube para el almacenamiento de datos en tiempo real.
*   **TypeScript:** Lenguaje de programación principal.
*   **HTML5 y CSS3:** Para la estructura y el estilo de la aplicación.

## ⚙️ Instalación y Puesta en Marcha

Para ejecutar este proyecto en un entorno local, sigue los siguientes pasos:

**Requisitos previos:**
*   Tener instalado [Node.js y npm](https://nodejs.org/).
*   Tener instalado [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`).

**Pasos:**

1.  **Clonar el repositorio o descargar el código fuente.**

2.  **Navegar a la carpeta del proyecto en una terminal:**
    ```bash
    cd angular-firebase-todo-app
    ```

3.  **Instalar las dependencias de Node.js:**
    ```bash
    npm install
    ```

4.  **Configurar las credenciales de Firebase:**
    *   Este proyecto ya incluye un fichero de configuración. Para usarlo con tu propia cuenta de Firebase, crea un proyecto nuevo en la [consola de Firebase](https://console.firebase.google.com/).
    *   Registra una nueva aplicación web y habilita **Firestore Database** en modo de prueba.
    *   Copia tus credenciales de Firebase y pégalas en el fichero `src/environments/environment.ts`.

5.  **Ejecutar la aplicación:**
    ```bash
    ng serve -o
    ```
    La aplicación se abrirá automáticamente en `http://localhost:4200/`.

    