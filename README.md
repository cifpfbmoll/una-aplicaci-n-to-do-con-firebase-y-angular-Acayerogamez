# 🚀 Lista de Tareas - Angular & Firebase

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular)](https://angular.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![SCSS](https://img.shields.io/badge/SCSS-CSS3-CC6699?style=for-the-badge&logo=sass)](https://sass-lang.com)

Una aplicación moderna de lista de tareas construida con Angular 18 y Firebase Firestore con sincronización en tiempo real.

## 📱 Demo en Vivo

🔗 **[Ver Demo](https://angular-firebase-todo-app-demo.web.app)** *(Próximamente)*

![App Screenshot](https://via.placeholder.com/800x400/6366f1/ffffff?text=Angular+Firebase+TODO+App)

## 🚀 Características

- ✅ **Agregar nuevas tareas** - Crea tareas con título y descripción opcional
- ✅ **Eliminar tareas** - Elimina tareas que ya no necesites
- ✅ **Marcar como completadas** - Cambia el estado de las tareas
- ✅ **Sincronización en tiempo real** - Los cambios se reflejan instantáneamente
- ✅ **Diseño responsive** - Funciona perfectamente en móviles y desktop
- ✅ **Interfaz moderna** - UI limpia y atractiva con animaciones suaves

## 🛠️ Stack Tecnológico

- **Frontend**: Angular 18
- **Backend**: Firebase Firestore
- **Estilos**: SCSS con variables CSS personalizadas
- **Tipografía**: Inter (Google Fonts)

## 📋 Prerrequisitos

- Node.js (versión 18.19.1 o superior)
- npm (versión 9.2.0 o superior)
- Cuenta de Firebase

## 🔧 Configuración

### 1. Clonar y configurar el proyecto

```bash
cd todo-app
npm install
```

### 2. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Habilita Firestore Database:
   - Ve a "Firestore Database"
   - Haz clic en "Crear base de datos"
   - Selecciona "Comenzar en modo de prueba"
   - Elige una ubicación para tu base de datos

4. Obtén la configuración de Firebase:
   - Ve a "Configuración del proyecto" (ícono de engranaje)
   - En la pestaña "General", desplázate hasta "Tus apps"
   - Si no tienes una app web, haz clic en "Agregar app" > ícono web
   - Copia la configuración de Firebase

### 3. Configurar variables de entorno

Edita los archivos de configuración con tus credenciales de Firebase:

**src/environments/environment.ts:**
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "tu-api-key",
    authDomain: "tu-project-id.firebaseapp.com",
    projectId: "tu-project-id",
    storageBucket: "tu-project-id.appspot.com",
    messagingSenderId: "tu-messaging-sender-id",
    appId: "tu-app-id"
  }
};
```

**src/environments/environment.prod.ts:**
```typescript
export const environment = {
  production: true,
  firebase: {
    apiKey: "tu-api-key",
    authDomain: "tu-project-id.firebaseapp.com",
    projectId: "tu-project-id",
    storageBucket: "tu-project-id.appspot.com",
    messagingSenderId: "tu-messaging-sender-id",
    appId: "tu-app-id"
  }
};
```

### 4. Configurar reglas de Firestore

En Firebase Console, ve a "Firestore Database" > "Reglas" y configura las reglas básicas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{document} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Nota**: Estas reglas permiten acceso completo a todos los usuarios. Para producción, implementa reglas de seguridad adecuadas.

## 🚀 Ejecución

### Desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Producción
```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`

## 📱 Uso

1. **Agregar una tarea**: Completa el formulario en la parte superior con el título (obligatorio) y descripción (opcional), luego haz clic en "Agregar Tarea"

2. **Marcar como completada**: Haz clic en el checkbox al lado de cualquier tarea para marcarla como completada o pendiente

3. **Eliminar una tarea**: Haz clic en el ícono de papelera (🗑️) para eliminar una tarea permanentemente

4. **Ver estadísticas**: En la parte superior de la lista verás el total de tareas, pendientes y completadas

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── task-form/          # Formulario para agregar tareas
│   │   ├── task-item/          # Componente individual de tarea
│   │   └── task-list/          # Lista de tareas con filtros
│   ├── models/
│   │   └── task.interface.ts   # Interfaces y tipos TypeScript
│   ├── services/
│   │   └── task.service.ts     # Servicio para operaciones CRUD
│   └── environments/           # Configuración de Firebase
└── styles.scss                # Estilos globales
```

## 🎨 Características de Diseño

- **Tema moderno**: Colores y tipografía contemporáneos
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Animaciones**: Transiciones suaves y efectos hover
- **Estados visuales**: Loading, error y estados vacíos
- **Accesibilidad**: Etiquetas y controles accesibles

## 🔧 Scripts Disponibles

- `npm start` - Ejecuta la app en modo desarrollo
- `npm run build` - Construye la app para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run lint` - Ejecuta el linter para revisar el código

## 📝 Notas Adicionales

- La aplicación usa Firestore en tiempo real, por lo que los cambios se sincronizan automáticamente
- Los datos se almacenan en la colección `tasks` de Firestore
- Cada tarea tiene un ID único generado automáticamente por Firestore

## 🐛 Solución de Problemas

### Error de conexión a Firebase
- Verifica que la configuración en `environments/` sea correcta
- Asegúrate de que Firestore esté habilitado en tu proyecto de Firebase
- Revisa las reglas de seguridad de Firestore

### La aplicación no carga
- Verifica que todas las dependencias estén instaladas (`npm install`)
- Asegúrate de estar usando Node.js 18.19.1 o superior
- Revisa la consola del navegador para errores específicos

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).