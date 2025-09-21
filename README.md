# Tuco’s Tattoo Portfolio

## Introducción

Esta aplicación web es un portfolio minimalista para el tatuador Tuco’s Tattoo. Está desarrollada con un backend en Java Spring Boot y un frontend en Angular + Bootstrap. El sitio permite mostrar trabajos filtrables por categorías (tags), ver cada trabajo en detalle, contar "About Me" y ofrecer contacto. Incluye un panel `/admin` simple para subir fotos y asignar tags sin autenticación pública.

## Arquitectura General

### Backend (Spring Boot)
- **Tecnologías**: Java 17, Spring Boot 3.2.0, Spring Data JPA, MySQL.
- **Estructura**:
  - `com.tucostattoo.controller`: Controladores REST para API pública y admin.
  - `com.tucostattoo.service`: Lógica de negocio.
  - `com.tucostattoo.repository`: Interfaces de repositorio con Spring Data JPA.
  - `com.tucostattoo.entity`: Entidades JPA (Photo, Tag).
- **Base de Datos**: MySQL con esquema generado automáticamente.

### Frontend (Angular)
- **Tecnologías**: Angular 17, Bootstrap 5, TypeScript.
- **Estructura**:
  - `src/app/components`: Componentes (Gallery, Header, Footer, etc.).
  - `src/app/services`: Servicios para consumir API.
  - `src/app/models`: Interfaces TypeScript.
- **Estilo**: Minimalista blanco/negro, responsive.

## Instalación y Despliegue

### Requisitos
- Java 17
- Node.js 18+
- MySQL
- Maven

### Configuración
1. Clona el repositorio.
2. Configura MySQL: Crea base de datos `tucostattoo`.
3. En `backend/src/main/resources/application.properties`, ajusta credenciales de DB y `app.upload.dir`.
4. Para variables de entorno (opcional): `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`.

### Inicialización DB
Ejecuta el script `scripts/init.sql` para crear tablas iniciales y datos de ejemplo.

### Construcción y Ejecución
1. Backend: `cd backend && mvn spring-boot:run` (asegúrate de que MySQL esté corriendo y la DB creada)
2. Frontend: `cd frontend && npm install && ng serve`
3. Accede a http://localhost:4200



## Uso del Panel /admin

### Cómo Subir Fotos
1. Ve a `/admin`.
2. Selecciona imagen (JPG/PNG, max 5MB).
3. Agrega descripción opcional.
4. Selecciona tags existentes o crea nuevos.
5. Marca como público.
6. Sube: La imagen se guarda en `uploads/`, se genera thumbnail si aplica.

### Asignar Tags
- Tags se crean automáticamente si no existen.
- Relación N:M entre fotos y tags.

### Proteger /admin
Dado que no hay login, protege así:
- **Opción 1**: Despliega en red local/privada (solo accesible desde tu máquina).
- **Opción 2**: Usa HTTP Basic Auth o restricción IP en proxy (e.g., Nginx).

## API Endpoints

- `GET /api/photos`: Lista fotos públicas (params: page, size, tag_id).
- `GET /api/photos/{id}`: Detalle foto.
- `GET /api/tags`: Lista tags.
- `POST /api/admin/photos`: Subir foto (multipart/form-data).
- `PUT /api/admin/photos/{id}`: Actualizar foto.
- `DELETE /api/admin/photos/{id}`: Eliminar foto.
- `GET /media/{filename}`: Servir imagen.

## Almacenamiento de Imágenes

### Por Defecto (Filesystem)
- Directorio: `uploads/` (configurable en `application.properties`).
- Thumbnails: `uploads/thumbnails/` (generados en backend).

### Alternativa (S3)
- Configura en `application.properties`: `app.storage.type=s3`, `app.s3.bucket-name`, etc.
- Credenciales via variables de entorno.

## Glosario de Archivos Clave

### Backend
- `BackendApplication.java`: Clase principal.
- `entity/Photo.java`: Entidad Photo con relaciones.
- `entity/Tag.java`: Entidad Tag.
- `repository/PhotoRepository.java`: Queries personalizadas.
- `service/PhotoService.java`: Lógica para fotos.
- `controller/PhotoController.java`: Endpoints públicos.
- `controller/AdminController.java`: Endpoints admin.
- `controller/MediaController.java`: Servir imágenes.

### Frontend
- `app.ts`: Componente raíz.
- `gallery/gallery.ts`: Galería con filtros.
- `admin/admin.ts`: Panel subida.
- `services/photo.ts`: Servicio para API.
- `models/photo.ts`: Interfaces.

Este README permite entender y mantener el proyecto sin revisar todos los archivos.
