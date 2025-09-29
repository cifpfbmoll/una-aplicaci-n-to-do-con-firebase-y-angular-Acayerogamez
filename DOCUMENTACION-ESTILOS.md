# 📚 Documentación de Estilos - Guía para Programadores Junior

## 🎨 Sistema de Diseño con SCSS - `src/styles.scss`

### ¿Qué es este archivo?
Es el **corazón visual** de tu aplicación. Como el **manual de marca** de una empresa, define todos los colores, espacios, fuentes y estilos que se usan en toda la app.

---

## 1. 🌐 **Importación de Fuentes**

```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

**¿Qué hace?**
- Importa la fuente **Inter** desde Google Fonts
- `wght@300;400;500;600;700` = Diferentes grosores de la fuente
- `display=swap` = Optimización de carga (muestra fuente del sistema mientras carga)

**¿Por qué Inter?**
- ✅ Fuente moderna y legible
- ✅ Optimizada para pantallas digitales
- ✅ Amplio soporte de caracteres
- ✅ Usada por empresas como GitHub, Netflix

---

## 2. 🎨 **Variables CSS Globales (`:root`)**

### ¿Qué son las Variables CSS?
Son como **cajas con etiquetas** donde guardas valores que usas muchas veces. En lugar de escribir `#6366f1` cientos de veces, escribes `var(--primary-color)`.

### 🎯 **Colores Principales**
```scss
:root {
  /* Colores primarios - El "azul" de tu marca */
  --primary-color: #6366f1;    // Color principal (azul índigo)
  --primary-hover: #5855eb;    // Cuando pasas el mouse encima
  --primary-light: #e0e7ff;    // Versión muy clara para fondos
  
  /* Colores secundarios - El "gris" elegante */
  --secondary-color: #64748b;  // Gris azulado
  --secondary-hover: #475569;  // Más oscuro al hover
  --secondary-light: #f1f5f9;  // Gris muy claro
}
```

**¿Por qué usar variables?**
- **Consistencia**: Mismo color en toda la app
- **Mantenimiento**: Cambias un valor y se actualiza todo
- **Temas**: Puedes crear modo oscuro fácilmente
- **Legibilidad**: `--primary-color` es más claro que `#6366f1`

### 🎨 **Sistema de Colores Semánticos**
```scss
/* Colores que comunican estado */
--success-color: #10b981;    // Verde para "éxito"
--success-light: #d1fae5;    // Fondo verde claro

--danger-color: #ef4444;     // Rojo para "peligro/error"
--danger-hover: #dc2626;     // Rojo más oscuro
--danger-light: #fee2e2;     // Fondo rojo claro

--warning-color: #f59e0b;    // Amarillo para "advertencia"
--warning-light: #fef3c7;    // Fondo amarillo claro
```

**¿Por qué colores semánticos?**
- **UX Intuitiva**: Verde = bueno, Rojo = malo
- **Accesibilidad**: Colores reconocibles universalmente
- **Escalabilidad**: Fácil agregar nuevos estados

### 🌫️ **Escala de Grises Profesional**
```scss
/* Del más claro al más oscuro */
--gray-50: #f9fafb;   // Casi blanco
--gray-100: #f3f4f6;  // Muy claro
--gray-200: #e5e7eb;  // Claro (bordes)
--gray-300: #d1d5db;  // Claro medio
--gray-400: #9ca3af;  // Medio
--gray-500: #6b7280;  // Medio oscuro
--gray-600: #4b5563;  // Oscuro (texto secundario)
--gray-700: #374151;  // Muy oscuro
--gray-800: #1f2937;  // Casi negro
--gray-900: #111827;  // Negro (texto principal)
```

**¿Por qué tantos grises?**
- **Jerarquía Visual**: Diferentes niveles de importancia
- **Sutileza**: Transiciones suaves entre elementos
- **Profesionalismo**: Look pulido y moderno

### 🎭 **Colores Contextuales**
```scss
/* Fondos */
--bg-primary: #ffffff;    // Fondo principal (blanco)
--bg-secondary: #f8fafc;  // Fondo de la app (gris muy claro)
--bg-tertiary: #f1f5f9;   // Fondo de secciones

/* Textos */
--text-primary: var(--gray-900);    // Texto principal (casi negro)
--text-secondary: var(--gray-600);  // Texto secundario (gris)
--text-tertiary: var(--gray-500);   // Texto terciario (gris claro)

/* Bordes */
--border-color: var(--gray-200);    // Bordes normales
--border-hover: var(--gray-300);    // Bordes al hover
```

---

## 3. ✨ **Sistema de Sombras**

```scss
/* Sombras para profundidad */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);           // Sutil
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);  // Media
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); // Grande
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); // Extra grande
```

**¿Qué significan los números?**
- `0 4px` = Desplazamiento horizontal y vertical
- `6px -1px` = Difuminado y extensión
- `rgba(0, 0, 0, 0.1)` = Negro con 10% de opacidad

**¿Cuándo usar cada sombra?**
- `sm` = Botones, inputs
- `md` = Tarjetas, elementos flotantes
- `lg` = Modales, menús desplegables
- `xl` = Elementos principales, héroes

---

## 4. 📏 **Sistema de Espaciado**

```scss
/* Espacios consistentes */
--spacing-xs: 0.25rem;   // 4px  - Muy pequeño
--spacing-sm: 0.5rem;    // 8px  - Pequeño
--spacing-md: 1rem;      // 16px - Medio (base)
--spacing-lg: 1.5rem;    // 24px - Grande
--spacing-xl: 2rem;      // 32px - Extra grande
--spacing-2xl: 3rem;     // 48px - Muy grande
```

**¿Por qué usar `rem`?**
- **Escalabilidad**: Se adapta al tamaño de fuente del usuario
- **Accesibilidad**: Respeta configuraciones de accesibilidad
- **Consistencia**: Base matemática (múltiplos de 16px)

---

## 5. 🔄 **Bordes Redondeados**

```scss
/* Radios de borde */
--radius-sm: 0.375rem;   // 6px  - Botones pequeños
--radius-md: 0.5rem;     // 8px  - Botones normales
--radius-lg: 0.75rem;    // 12px - Tarjetas
--radius-xl: 1rem;       // 16px - Contenedores grandes
```

---

## 6. ⚡ **Sistema de Transiciones**

```scss
/* Velocidades de animación */
--transition-fast: 150ms ease-in-out;    // Rápido - Hover de botones
--transition-normal: 300ms ease-in-out;  // Normal - Cambios de estado
--transition-slow: 500ms ease-in-out;    // Lento - Transiciones grandes
```

**¿Qué es `ease-in-out`?**
- **ease-in**: Empieza lento, acelera
- **ease-out**: Empieza rápido, desacelera
- **ease-in-out**: Empieza lento, acelera, desacelera (más natural)

---

## 7. 🔄 **Reset CSS y Estilos Base**

### Reset Universal
```scss
* {
  box-sizing: border-box; // Incluye padding y border en el tamaño total
}
```

**¿Por qué `box-sizing: border-box`?**
- Sin esto: `width: 100px` + `padding: 10px` = elemento de 120px
- Con esto: `width: 100px` + `padding: 10px` = elemento de 100px
- **Más predecible** y fácil de calcular

### Estilos del Body
```scss
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;                    // Tamaño base
  line-height: 1.5;                   // Espaciado entre líneas
  color: var(--text-primary);         // Color de texto principal
  background-color: var(--bg-secondary); // Fondo de la app
  -webkit-font-smoothing: antialiased; // Texto más suave en Mac
  -moz-osx-font-smoothing: grayscale; // Texto más suave en Firefox/Mac
}
```

---

## 8. 📝 **Sistema Tipográfico**

### Títulos Consistentes
```scss
h1, h2, h3, h4, h5, h6 {
  margin: 0;           // Sin márgenes por defecto
  font-weight: 600;    // Semi-bold
  line-height: 1.2;    // Líneas más juntas para títulos
}

h1 { font-size: 2.5rem; }    // 40px
h2 { font-size: 2rem; }      // 32px
h3 { font-size: 1.5rem; }    // 24px
h4 { font-size: 1.25rem; }   // 20px
h5 { font-size: 1.125rem; }  // 18px
h6 { font-size: 1rem; }      // 16px
```

**¿Por qué `margin: 0`?**
- **Control Total**: Defines exactamente dónde va cada espacio
- **Consistencia**: No hay sorpresas con márgenes del navegador
- **Flexibilidad**: Cada componente maneja su propio espaciado

---

## 9. 📝 **Sistema de Formularios**

### Grupos de Formulario
```scss
.form-group {
  margin-bottom: var(--spacing-lg); // Espacio entre campos
}

.form-group label {
  display: block;                    // Ocupa toda la línea
  margin-bottom: var(--spacing-sm);  // Espacio antes del input
  font-weight: 500;                  // Medium weight
  color: var(--text-primary);        // Color principal
}
```

### Controles de Formulario
```scss
.form-control {
  width: 100%;                                    // Ancho completo
  padding: 0.75rem 1rem;                         // Espacio interno
  font-size: 1rem;                               // Tamaño de texto
  line-height: 1.5;                              // Altura de línea
  color: var(--text-primary);                    // Color del texto
  background-color: var(--bg-primary);           // Fondo blanco
  border: 2px solid var(--border-color);         // Borde gris
  border-radius: var(--radius-md);               // Bordes redondeados
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-control:focus {
  outline: none;                                  // Sin outline del navegador
  border-color: var(--primary-color);            // Borde azul al focus
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); // Sombra azul sutil
}
```

**¿Por qué `outline: none`?**
- **Diseño Personalizado**: Usamos border-color y box-shadow
- **Mejor UX**: Indicador de focus más bonito
- **⚠️ Importante**: Siempre reemplaza con indicador visual alternativo

---

## 10. 🔘 **Sistema de Botones**

### Botón Base
```scss
.btn {
  display: inline-flex;                    // Flexbox para alineación
  align-items: center;                     // Centrado vertical
  justify-content: center;                 // Centrado horizontal
  padding: 0.75rem 1.5rem;               // Espaciado interno
  font-size: 1rem;                       // Tamaño de texto
  font-weight: 500;                       // Medium weight
  line-height: 1;                         // Sin espaciado extra
  text-decoration: none;                  // Sin subrayado
  border: 2px solid transparent;          // Borde transparente (reserva espacio)
  border-radius: var(--radius-md);        // Bordes redondeados
  cursor: pointer;                        // Cursor de mano
  transition: all var(--transition-fast); // Transición suave
  gap: var(--spacing-sm);                 // Espacio entre ícono y texto
}
```

### Variantes de Botones
```scss
/* Botón Primario */
.btn-primary {
  color: white;                           // Texto blanco
  background-color: var(--primary-color); // Fondo azul
  border-color: var(--primary-color);     // Borde azul
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-hover); // Azul más oscuro
  border-color: var(--primary-hover);     // Borde más oscuro
  transform: translateY(-1px);            // Efecto de "levantarse"
  box-shadow: var(--shadow-md);           // Sombra para profundidad
}

/* Botón Secundario */
.btn-secondary {
  color: var(--text-primary);             // Texto oscuro
  background-color: var(--bg-primary);    // Fondo blanco
  border-color: var(--border-color);      // Borde gris
}
```

**¿Por qué `:not(:disabled)`?**
- Evita efectos hover en botones deshabilitados
- Mejor UX: no confunde al usuario
- Accesibilidad: comportamiento esperado

---

## 11. ⚡ **Animaciones y Spinners**

### Spinner de Carga
```scss
.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;          // Borde invisible
  border-top: 2px solid currentColor;     // Solo el borde superior visible
  border-radius: 50%;                     // Círculo perfecto
  animation: spin 1s linear infinite;     // Animación infinita
}

@keyframes spin {
  0% { transform: rotate(0deg); }         // Posición inicial
  100% { transform: rotate(360deg); }     // Rotación completa
}
```

**¿Qué es `currentColor`?**
- Usa el color del texto del elemento padre
- **Flexible**: Se adapta automáticamente
- **Mantenible**: No hay que cambiar colores en múltiples lugares

---

## 12. 🛠️ **Clases Utilitarias**

### Alineación de Texto
```scss
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
```

### Espaciado Rápido
```scss
/* Margin Bottom */
.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: var(--spacing-sm); }
.mb-2 { margin-bottom: var(--spacing-md); }
.mb-3 { margin-bottom: var(--spacing-lg); }

/* Margin Top */
.mt-0 { margin-top: 0; }
.mt-1 { margin-top: var(--spacing-sm); }
.mt-2 { margin-top: var(--spacing-md); }
.mt-3 { margin-top: var(--spacing-lg); }
```

**¿Por qué clases utilitarias?**
- **Rapidez**: Aplicar estilos sin crear CSS personalizado
- **Consistencia**: Siempre usa el sistema de espaciado
- **Mantenibilidad**: Cambias las variables y todo se actualiza

---

## 13. 📱 **Diseño Responsive**

### Media Query para Móviles
```scss
@media (max-width: 768px) {
  /* Títulos más pequeños en móvil */
  h1 { font-size: 2rem; }      // De 40px a 32px
  h2 { font-size: 1.75rem; }   // De 32px a 28px
  h3 { font-size: 1.25rem; }   // De 24px a 20px
  
  /* Botones más pequeños */
  .btn {
    padding: 0.625rem 1.25rem;  // Menos padding
    font-size: 0.875rem;        // Texto más pequeño
  }
}
```

**¿Por qué 768px?**
- **Estándar de la industria** para tablets
- **Punto de quiebre común** entre desktop y móvil
- **Cobertura amplia** de dispositivos

---

## 🎯 **Metodología de Diseño**

### 1. **Mobile-First**
- Diseñamos primero para móvil
- Agregamos complejidad para pantallas grandes
- Mejor rendimiento en dispositivos pequeños

### 2. **Sistema de Variables**
- Un solo lugar para cambiar colores/espacios
- Consistencia automática en toda la app
- Fácil crear temas (modo oscuro)

### 3. **Componentes Reutilizables**
- `.btn`, `.form-control` se usan en toda la app
- Menos CSS duplicado
- Cambios centralizados

### 4. **Semántica Visual**
- Colores que comunican (rojo = peligro, verde = éxito)
- Espaciado proporcional
- Jerarquía tipográfica clara

---

## 🛠️ **Cómo Usar este Sistema**

### En tu HTML:
```html
<!-- Botón primario -->
<button class="btn btn-primary">Guardar</button>

<!-- Campo de formulario -->
<div class="form-group">
  <label>Título</label>
  <input type="text" class="form-control" placeholder="Escribe aquí...">
</div>

<!-- Espaciado rápido -->
<div class="mb-2">Elemento con margen inferior</div>
```

### En tu SCSS:
```scss
.mi-componente {
  background-color: var(--bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}
```

---

## 🎓 **Conceptos Clave para Recordar**

1. **Variables CSS** = Valores reutilizables y centralizados
2. **Sistema de Colores** = Consistencia y comunicación visual
3. **Espaciado Proporcional** = Armonía visual con base matemática
4. **Mobile-First** = Diseño desde lo más simple a lo complejo
5. **Clases Utilitarias** = Rapidez sin sacrificar consistencia
6. **Componentes Globales** = Reutilización y mantenibilidad
7. **Transiciones Suaves** = Mejor experiencia de usuario

¡Con este sistema de estilos tienes todo lo necesario para crear interfaces modernas y profesionales! 🎨✨
