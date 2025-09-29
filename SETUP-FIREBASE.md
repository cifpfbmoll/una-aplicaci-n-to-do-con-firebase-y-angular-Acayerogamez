# 🔥 Configuración de Firebase - Pasos Detallados

## 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto" o "Agregar proyecto"
3. Ingresa el nombre de tu proyecto (ej: "todo-app-angular")
4. Acepta los términos y continúa
5. Configura Google Analytics (opcional, puedes deshabilitarlo para este proyecto)
6. Haz clic en "Crear proyecto"

## 2. Configurar Firestore Database

1. En el panel lateral izquierdo, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (para desarrollo)
4. Elige una ubicación para tu base de datos (recomendado: la más cercana a tu ubicación)
5. Haz clic en "Listo"

## 3. Obtener Configuración de Firebase

1. En la página principal del proyecto, haz clic en el ícono de engranaje ⚙️ (Configuración del proyecto)
2. Ve a la pestaña "General"
3. Desplázate hacia abajo hasta la sección "Tus apps"
4. Si no tienes una app web, haz clic en el ícono web `</>` para agregar una
5. Registra tu app:
   - Nombre de la app: "Todo App Angular"
   - No es necesario configurar Firebase Hosting por ahora
   - Haz clic en "Registrar app"
6. Copia el código de configuración que aparece

## 4. Configurar Variables de Entorno

Reemplaza las configuraciones en estos archivos con tus datos reales de Firebase:

### `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC...",                    // Tu API Key
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
  }
};
```

### `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyC...",                    // Tu API Key
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
  }
};
```

## 5. Configurar Reglas de Firestore (Importante para Seguridad)

1. En Firebase Console, ve a "Firestore Database"
2. Haz clic en la pestaña "Reglas"
3. Reemplaza las reglas existentes con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura en la colección tasks
    match /tasks/{document} {
      allow read, write: if true;
    }
  }
}
```

4. Haz clic en "Publicar"

**⚠️ IMPORTANTE**: Estas reglas permiten acceso completo a todos los usuarios. Para un entorno de producción, deberías implementar autenticación y reglas más restrictivas.

## 6. Verificar la Configuración

1. Guarda todos los archivos
2. Ejecuta la aplicación:
   ```bash
   npm start
   ```
3. Abre tu navegador en `http://localhost:4200`
4. Intenta agregar una tarea
5. Ve a Firebase Console > Firestore Database para verificar que la tarea se guardó

## 🔍 Verificación de la Estructura de Datos

Después de agregar tu primera tarea, en Firestore deberías ver:

```
📁 tasks (colección)
  📄 documento-id-aleatorio
    ├── title: "Mi primera tarea"
    ├── description: "Descripción opcional"
    ├── completed: false
    ├── createdAt: timestamp
    └── updatedAt: timestamp
```

## 🚨 Solución de Problemas Comunes

### Error: "Firebase project not found"
- Verifica que el `projectId` en environment.ts coincida exactamente con el ID del proyecto en Firebase Console

### Error: "Permission denied"
- Asegúrate de que las reglas de Firestore estén configuradas correctamente
- Verifica que Firestore Database esté habilitado

### Error: "Module not found"
- Ejecuta `npm install` para asegurar que todas las dependencias estén instaladas

### La app carga pero no guarda tareas
- Abre las herramientas de desarrollador del navegador (F12)
- Revisa la consola para errores específicos
- Verifica que la configuración de Firebase sea correcta

## 🎉 ¡Listo!

Una vez completados estos pasos, tu aplicación de tareas estará completamente funcional con Firebase como backend. Podrás:

- ✅ Agregar nuevas tareas
- ✅ Marcar tareas como completadas
- ✅ Eliminar tareas
- ✅ Ver sincronización en tiempo real

Para más información, consulta la [documentación oficial de Firebase](https://firebase.google.com/docs).
