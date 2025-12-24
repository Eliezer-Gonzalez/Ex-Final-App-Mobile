# Proyecto: EXAMEN FINAL - Desarrollo Móvil

Esta es la ultima entrega del proyecto de Desarrollo Móvil (continuación de la EV3). La aplicación es una lista simple de tareas construida con Expo y React-Native pensada para practicar rutas con `expo-router`, manejo de estado, cámara, permisos, y consumo de API REST. (AHORA CONECTADA A SERVIDOR EXTERNO.)

**Autores:** Eliezer Gonzalez, Grecia Vidal

---

## Descripción del Proyecto

Aplicación móvil de gestión de tareas que permite a los usuarios:
- Crear, visualizar y eliminar tareas
- Adjuntar fotografías a las tareas usando la cámara del dispositivo
- Registrar automáticamente las coordenadas GPS al tomar una foto
- Autenticación de usuarios con sistema de login/registro
- Persistencia de datos mediante API REST y almacenamiento local
- Marcar tareas como completadas con feedback visual

---

## Stack Tecnológico

- **Framework:** Expo SDK
- **Lenguaje:** TypeScript
- **UI Framework:** React Native
- **Navegación:** expo-router
- **Estado Local:** React Context API
- **Persistencia Local:** AsyncStorage (@react-native-async-storage/async-storage)
- **Backend:** API REST
- **Librerías adicionales:**
  - `expo-image-picker` - Captura de imágenes
  - `expo-location` - Geolocalización
  - `expo-blur` - Efectos visuales
  - `expo-linear-gradient` - Gradientes

---

## Estructura del Proyecto

### Carpetas principales

- **`app/`** — Rutas de la aplicación usando `expo-router`:
  - `app/(tabs)/index.tsx`: Pantalla principal con lista de tareas. Carga todos desde el almacenamiento y persiste cambios.
  - `app/login.tsx`: Pantalla de autenticación con efecto `BlurView`.
  - `app/register.tsx`: Pantalla de registro de nuevos usuarios.
  - `app/(tabs)/profile.tsx`: Pantalla de perfil del usuario.

- **`components/`** — Componentes reutilizables:
  - `task-item.tsx`: Renderiza cada tarea con soporte para título, imagen, coordenadas y eliminación. Indica visualmente tareas completadas (texto tachado, imagen atenuada).
  - `context/auth-context.tsx`: Contexto global para manejo de sesión (login/logout con AsyncStorage).

- **`components/ui/`** — Componentes de interfaz:
  - `new-task.tsx`: Formulario de creación de tareas con integración de cámara y GPS.
  - `button.tsx`: Botón personalizable con props `style` y `textStyle`.
  - `title.tsx`, `icon-symbol.*`, `collapsible.tsx`: Componentes auxiliares de UI.

- **`uitls/storage.ts`** — Funciones para persistencia local de `todos` y `session`.

- **`components/services/`** — Servicios de comunicación con backend:
  - `auth-services.tsx`: Registro y autenticación de usuarios.
  - `todo-service.tsx`: Operaciones CRUD de tareas vía API REST.

---

## Funcionalidades Implementadas

### Autenticación
- Sistema de login con validación de credenciales
- Registro de nuevos usuarios
- Persistencia de sesión con AsyncStorage
- Protección de rutas autenticadas

### Gestión de Tareas
- Crear tareas con título obligatorio
- Adjuntar foto opcional desde la cámara
- Captura automática de coordenadas GPS al tomar foto
- Marcar tareas como completadas
- Eliminar tareas
- Persistencia local y sincronización con backend

### Permisos y Sensores
- Permisos de cámara (`expo-image-picker`)
- Permisos de ubicación (`expo-location`) - solo si se toma foto
- Visualización de coordenadas bajo la imagen capturada

---

## Instrucciones de Ejecución

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Dispositivo físico con Expo Go o emulador configurado

### Instalación

1. Clonar el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd Ex-Final
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (si aplica):
   - Crear archivo `.env` con la URL del backend
   - Ejemplo: `API_URL=https://tu-backend.com/api`

4. Iniciar el proyecto:
```bash
npx expo start
```

5. Escanear el código QR con Expo Go (Android/iOS) o presionar:
   - `a` para abrir en emulador Android
   - `i` para abrir en simulador iOS
   - `w` para abrir en navegador web

### Notas importantes
- Asegúrate de que el backend esté en ejecución antes de usar la app
- Para probar funcionalidades de cámara y GPS, usa un dispositivo físico
- Los emuladores requieren configuración adicional para simular ubicación

---

## Pruebas y comprobaciones rápidas

- Crear una tarea con foto: toma una foto, acepta permisos de ubicación si se solicitan, guarda la tarea. La tarea guardada debe incluir `photoUri` y `coordinates` (si se pudo obtener).
- Crear una tarea sin foto: escribe el título y guarda; la tarea no debe solicitar permisos de ubicación ni incluir coordenadas.
- Eliminar una tarea: al eliminarla, cerrar sesión y volver a iniciar sesión, asi como cerrar y abrir la app, mantiene la lista actualizada (las tareas eliminadas no reaparecerán).

---

## Utilización de la IA

- Se utilizó para solucionar problemas con el Blur del `LOGIN`.
- Se ulitizó para investigar librerías compatibles con EXPO. EJ: `expo-linear-gradient`.
- Se utilizó para solucionar conflicto de dependencias con el `Node_Modules`.
- Se utilizó para completaciones de Código (Revisamos y aprobamos manualmente todos los cambios antes de aplicarlos.)
- Se utilizó para la creación de la vista de registro de cuentas.
