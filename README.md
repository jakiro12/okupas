# Tecnologías del proyecto

## Base

- React Native
- Expo
- TypeScript
- Expo Router

## Base de datos local (Offline First)

- Expo SQLite

## Base de datos en la nube

- Firebase Firestore

## Almacenamiento de archivos

- Firebase Storage

## Sincronización y estado remoto

- React Query

## Conectividad

- @react-native-community/netinfo

## Cámara

- Expo Camera

## Sistema de archivos

- Expo FileSystem

## Geolocalización

- Expo Location

## Mapas

- React Native Maps

## Editor de imágenes

- React Native Skia
- React Native Gesture Handler
- React Native Reanimated

## Utilidades

- UUID
- Expo print para generar pdf
- Expo sharing para compartir archivos por wsp, aunque si guarda el pdf dentro del celular es irrelevante

# Arquitectura funcional (MVP)

## 1. Dashboard

### Objetivo

Punto de entrada de la aplicación y centro de control.

### Información mostrada

* Estado de la conexión
* Calidad de conexión
* Tipo de conexión (WiFi / Datos móviles / Sin conexión)
* Tiempo estimado de sincronización
* Cantidad de inspecciones pendientes
* Cantidad de fotografías pendientes
* Última sincronización realizada
* Espacio utilizado por la base de datos local
* Espacio utilizado por fotografías

### Funcionalidades

* Crear nueva inspección
* Abrir listado de inspecciones
* Abrir cola de sincronización
* Ver estado de la conexión
* Abrir configuración
* Sincronización manual
* Reintentar sincronización

---

# 2. Nueva Inspección

### Objetivo

Crear una nueva inspección local.

### Información

* Título
* Cliente
* Dirección
* Ciudad
* Provincia
* Fecha
* Hora
* Observación inicial
* Coordenadas GPS
* Estado (Pendiente / Sincronizada)

### Funcionalidades

* Guardar localmente
* Cancelar
* Obtener ubicación automáticamente
* Editar información posteriormente

---

# 3. Lista de Inspecciones

### Objetivo

Visualizar todas las inspecciones.

### Información

* Título
* Cliente
* Fecha
* Estado
* Cantidad de fotografías
* Cantidad de observaciones
* Cantidad de ambientes
* Última modificación

### Funcionalidades

* Buscar
* Ordenar
* Filtrar
* Abrir inspección
* Eliminar inspección
* Duplicar inspección
* Compartir (futuro)

Filtros posibles

* Todas
* Pendientes
* Sincronizadas
* Favoritas
* Recientes

---

# 4. Detalle de Inspección

### Objetivo

Administrar completamente una inspección.

### Información

* Información general
* Estado de sincronización
* Fecha de creación
* Fecha de modificación
* Cliente
* Dirección
* Observaciones generales

### Funcionalidades

* Editar datos
* Agregar ambientes
* Agregar fotografías
* Agregar observaciones
* Eliminar fotografías
* Eliminar ambientes
* Sincronizar únicamente esta inspección
* Eliminar inspección

---

# 5. Ambientes / Sectores

### Objetivo

Dividir la inspección por sectores.

Ejemplos

* Cocina
* Living
* Dormitorio
* Baño
* Patio
* Garaje

### Información

* Nombre
* Orden
* Cantidad de fotografías
* Cantidad de observaciones

### Funcionalidades

* Crear ambiente
* Editar nombre
* Reordenar
* Eliminar
* Agregar fotografías
* Agregar observaciones

---

# 6. Fotografías

### Objetivo

Administrar todas las fotografías de un ambiente.

### Información

* Miniatura
* Fecha
* Hora
* Tamaño
* Estado de sincronización

### Funcionalidades

* Tomar fotografía
* Seleccionar desde galería (opcional)
* Eliminar
* Editar
* Renombrar
* Compartir (futuro)

---

# 7. Editor de Fotografías

### Objetivo

Agregar anotaciones sobre la imagen.

### Herramientas

* Lápiz
* Flecha
* Línea
* Rectángulo
* Círculo
* Texto
* Resaltador
* Borrador
* Selector de color
* Selector de grosor
* Zoom
* Pan
* Deshacer
* Rehacer

### Funcionalidades

* Guardar cambios
* Cancelar cambios
* Exportar imagen editada
* Restaurar imagen original

---

# 8. Observaciones

### Objetivo

Registrar notas relacionadas con un ambiente o fotografía.

### Información

* Título
* Descripción
* Fecha
* Hora

### Funcionalidades

* Crear
* Editar
* Eliminar
* Asociar fotografía
* Asociar ambiente

---

# 9. Cola de Sincronización

### Objetivo

Visualizar todo lo pendiente de subir.

### Información

* Registros pendientes
* Fotografías pendientes
* Errores
* Reintentos
* Última sincronización

### Funcionalidades

* Sincronizar todo
* Cancelar sincronización
* Reintentar elementos con error
* Ver detalles del error

---

# 10. Estado de Conexión

### Objetivo

Determinar si conviene sincronizar.

### Información

* Tipo de conexión
* Intensidad de señal
* Latencia
* Velocidad estimada de subida
* Velocidad estimada de descarga
* Estado del servidor Firebase
* Tiempo estimado de sincronización
* Cantidad de datos pendientes

### Clasificación

* Excelente
* Buena
* Aceptable
* Lenta
* Muy lenta
* Sin conexión

### Funcionalidades

* Ejecutar prueba de conexión
* Ver historial de mediciones
* Sincronizar manualmente

---

# 11. Configuración

### Información

* Calidad de fotografías
* Compresión
* Carpeta de almacenamiento
* Sincronización automática
* Frecuencia de sincronización
* Tamaño máximo de subida
* Información de la aplicación

### Funcionalidades

* Limpiar base de datos local
* Limpiar caché
* Eliminar fotografías temporales
* Exportar base de datos
* Importar base de datos
* Restaurar copia de seguridad

---

# Arquitectura de datos

## Inspección

* Información general
* Ambientes
* Observaciones
* Fotografías
* Estado de sincronización
* Historial de cambios

---

## Ambiente

* Nombre
* Orden
* Fotografías
* Observaciones

---

## Fotografía

* Ruta local
* Ruta en Firebase Storage
* Fecha
* Hora
* Coordenadas GPS
* Ambiente asociado
* Estado de sincronización
* Imagen editada

---

## Observación

* Título
* Descripción
* Fecha
* Hora
* Ambiente asociado
* Fotografía asociada

---

# Motor Offline First

## Responsabilidades

* Guardar inmediatamente en SQLite.
* Nunca depender de Internet para trabajar.
* Registrar todas las operaciones pendientes.
* Detectar cambios locales.
* Detectar cambios sincronizados.
* Reintentar automáticamente cuando vuelva la conexión.
* Evitar duplicados.
* Resolver conflictos de sincronización.
* Mantener consistencia entre SQLite y Firestore.

---

# Motor de Sincronización

## Funcionalidades

* Cola FIFO de sincronización.
* Subida por lotes.
* Reanudación después de interrupciones.
* Reintentos automáticos.
* Cancelación manual.
* Sincronización individual.
* Sincronización completa.
* Priorización de datos antes que fotografías.

---

# Medidor Inteligente de Conexión

## Variables analizadas

* Tipo de red.
* Intensidad de señal.
* Latencia.
* Velocidad de subida.
* Velocidad de descarga.
* Cantidad de registros pendientes.
* Cantidad de fotografías.
* Peso total de la sincronización.

## Resultado esperado

Mostrar al usuario:

* Calidad de conexión.
* Tiempo estimado para sincronizar.
* Recomendación de sincronizar o esperar.
* Progreso en tiempo real durante la subida.

---

# Funcionalidades futuras

* PDF automático del informe.
* Firma digital.
* Plantillas de inspección.
* Checklists personalizadas.
* Grabación de audio.
* Dictado por voz.
* Escaneo de códigos QR.
* Escaneo de códigos de barras.
* Modo oscuro.
* Exportación a Excel.
* Exportación a PDF.
* Copias de seguridad automáticas.
* Compartir inspecciones.
* Trabajo colaborativo.
* Multiusuario.
* Panel web administrativo.
* Notificaciones push.
* Estadísticas de inspecciones.
* IA para generar observaciones a partir de fotografías.
