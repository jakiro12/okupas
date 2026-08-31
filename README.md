# 📋 App de Inspecciones Offline

Aplicación móvil para la gestión y realización de inspecciones de forma **offline-first**, permitiendo registrar información, tomar y gestionar fotografías y generar reportes PDF directamente desde el dispositivo.

El objetivo principal es que todas las funcionalidades esenciales puedan utilizarse **sin conexión a Internet**, almacenando la información y los archivos localmente.

## 🚀 Tecnologías

- **React Native**
- **Expo**
- **TypeScript**
- **Expo Router** — navegación y gestión de rutas
- **SQLite** — almacenamiento local de inspecciones
- **FileSystem** — gestión de archivos e imágenes locales
- **Expo Camera** — captura de fotografías
- **React Native Vector Icons** — iconografía
- **PDF Generation** — generación de reportes PDF localmente

## ⚙️ Funcionalidades actuales

- Creación y edición de inspecciones.
- Persistencia de datos mediante SQLite.
- Funcionamiento completamente offline.
- Gestión de inspecciones pendientes y completadas.
- Captura y gestión de fotografías.
- Almacenamiento de imágenes en el sistema de archivos del dispositivo.
- Generación de reportes PDF.
- Gestión y visualización de archivos generados.
- Edición de inspecciones previamente completadas.
- Recuperación de inspecciones pendientes para continuar su proceso.
- Validación del estado de las inspecciones antes de generar reportes.

## 📱 Arquitectura

La aplicación está diseñada con un enfoque **offline-first**, separando responsabilidades entre:

- **UI / Screens** — interfaces y flujo de navegación.
- **Repositories** — acceso y operaciones sobre SQLite.
- **Services** — cámara, sistema de archivos y generación de PDF.
- **Components** — componentes reutilizables.
- **Database** — esquema y persistencia local.
- **Types / Utils** — tipos y utilidades compartidas.

## 🔮 Próximas implementaciones

El proyecto está preparado para incorporar nuevas funcionalidades relacionadas con la gestión y edición de fotografías.

### 🖼️ Editor de fotografías

Se prevé incorporar un editor de imágenes similar a **Paint**, permitiendo realizar modificaciones directamente sobre las fotografías de una inspección, como anotaciones, dibujos y otros elementos visuales.

### 🧭 Recorrido 3D de fotografías

Como evolución futura, se plantea incorporar un sistema de **recorrido 3D basado en fotografías**, permitiendo una representación más interactiva del lugar inspeccionado y una navegación entre las imágenes capturadas.

Estas funcionalidades forman parte del roadmap y no son necesarias para el funcionamiento actual del sistema.

## 🌐 Sincronización web

La aplicación fue planteada inicialmente con la posibilidad de incorporar una **sincronización con una plataforma web**.

Actualmente el funcionamiento es completamente local y no depende de un backend ni de conexión a Internet. La sincronización web queda como una implementación adicional a futuro, permitiendo eventualmente:

- Sincronizar inspecciones entre dispositivos y servidor.
- Realizar backups remotos.
- Consultar inspecciones desde una plataforma web.
- Gestionar reportes de forma centralizada.

## 📌 Estado del proyecto

**MVP funcional — Offline First**

Las funcionalidades principales para crear, completar, editar, almacenar y generar reportes de inspecciones se encuentran implementadas y funcionan localmente en el dispositivo.

El proyecto continúa preparado para futuras extensiones como edición avanzada de fotografías, recorridos 3D y sincronización con una plataforma web.