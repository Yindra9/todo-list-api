
# Todo List API

API REST desarrollada con Node.js, Express y Supabase para la gestión de tareas, implementando una arquitectura modular por capas, validación de datos con Zod, documentación interactiva mediante Swagger y autenticación segura con JWT.

## Descripción del proyecto

Todo List API permite gestionar tareas mediante operaciones CRUD (crear, consultar, actualizar y eliminar).

El proyecto utiliza Supabase como base de datos PostgreSQL y JWT para controlar el acceso a los recursos protegidos.

Fue desarrollado como una práctica de implementación de APIs REST, aplicando separación de responsabilidades, patrón Repository e inyección de dependencias.

## Tecnologías utilizadas

- Node.js
- JavaScript (ES Modules)
- Express.js
- Supabase (PostgreSQL)
- Zod
- JWT (jsonwebtoken)
- bcryptjs
- Swagger UI / OpenAPI 3.1
- CORS
- Morgan

## Arquitectura del proyecto

El proyecto utiliza una arquitectura modular dividida en capas:

- Routes: define los endpoints HTTP.
- Controller: procesa las solicitudes y respuestas.
- Service: implementa la lógica de negocio.
- Repository: realiza las operaciones sobre Supabase.
- Schema: valida los datos mediante Zod.
- Middlewares: gestiona autenticación, validaciones y errores.
- Docs: genera la documentación OpenAPI.

Flujo de ejecución:

Cliente → Routes → Middlewares → Controller → Service → Repository → Supabase

Las dependencias se construyen mediante composición manual (Repository → Service → Controller).

## Estructura del proyecto

```text
src/
├── config/
│   └── env.js
├── docs/
│   ├── docs.routes.js
│   ├── helpers.js
│   └── openapi.js
├── lib/
│   ├── jwt.js
│   └── supabase.js
├── middlewares/
│   ├── auth.js
│   ├── error-handler.js
│   ├── not-found.js
│   └── validate.js
├── modules/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.docs.js
│   │   ├── auth.routes.js
│   │   ├── auth.schema.js
│   │   ├── auth.service.js
│   │   └── users.repository.js
│   ├── health/
│   │   ├── health.docs.js
│   │   └── health.routes.js
│   └── task/
│       ├── task.controller.js
│       ├── task.docs.js
│       ├── task.repository.js
│       ├── task.routes.js
│       ├── task.schema.js
│       └── task.service.js
├── utils/
│   └── http-error.js
├── app.js
├── routes.js
└── server.js
```

## Requisitos

- Node.js compatible con las dependencias instaladas
- npm
- Cuenta y proyecto en Supabase
- Base de datos PostgreSQL configurada
- Variables de entorno válidas

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/TU_USUARIO/todo-list-api.git
```

2. Ingresar a la carpeta:

```bash
cd todo-list-api
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear el archivo `.env` tomando como referencia `.env.example`.

5. Configurar las credenciales de Supabase y el secreto JWT.

6. Iniciar el servidor:

```bash
npm run dev
```

La API estará disponible en:

http://localhost:3000/api

## Variables de entorno

Se utilizan las siguientes variables:

| Variable | Descripción |
|---|---|
| SUPABASE_URL | URL del proyecto Supabase |
| SUPABASE_SECRET_KEY | Clave privada para el acceso a Supabase |
| JWT_SECRET | Clave secreta utilizada para firmar JWT |
| JWT_EXPIRES_IN | Duración del token, normalmente 1h |

El archivo `.env` no debe publicarse en GitHub.

## Base de datos

El proyecto utiliza dos tablas principales.

### tasks

| Campo | Descripción |
|---|---|
| id | Identificador numérico |
| title | Título de la tarea |
| description | Descripción opcional |
| done | Estado de la tarea |
| created_at | Fecha de creación |

### users

| Campo | Descripción |
|---|---|
| id | Identificador UUID |
| email | Correo único del usuario |
| password_hash | Hash de contraseña generado con bcrypt |
| created_at | Fecha de registro |

La tabla users utiliza Row Level Security y está diseñada para que la API acceda mediante credenciales privadas del servidor.

## Endpoints

### Health

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/health | Estado del servidor |
| GET | /api/health/db | Estado de conexión con Supabase |

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |
| GET | /api/auth/me | Consultar usuario autenticado |

### Tareas

Todas las rutas de tareas requieren autenticación JWT.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/tasks | Listar tareas |
| GET | /api/tasks/:id | Obtener tarea |
| POST | /api/tasks | Crear tarea |
| PATCH | /api/tasks/:id | Actualizar tarea |
| DELETE | /api/tasks/:id | Eliminar tarea |

## Autenticación JWT

Para acceder a los endpoints protegidos:

1. Registrar un usuario mediante POST /api/auth/register.
2. Iniciar sesión mediante POST /api/auth/login.
3. Obtener el campo accessToken.
4. Enviar el token utilizando el encabezado:

```http
Authorization: Bearer TU_ACCESS_TOKEN
```

Las contraseñas se almacenan mediante hashes bcrypt.

Los tokens se verifican antes de permitir el acceso a las tareas.

## Ejemplos de uso

### Registrar usuario

POST /api/auth/register

```json
{
  "email": "usuario@example.com",
  "password": "EjemploSeguro123"
}
```

### Iniciar sesión

POST /api/auth/login

```json
{
  "email": "usuario@example.com",
  "password": "EjemploSeguro123"
}
```

### Crear tarea

POST /api/tasks

Requiere JWT.

```json
{
  "title": "Preparar proyecto",
  "description": "Completar la documentación",
  "done": false
}
```

### Actualizar tarea

PATCH /api/tasks/:id

Requiere JWT.

```json
{
  "done": true
}
```

## Documentación Swagger

El proyecto incluye documentación interactiva mediante Swagger UI.

Interfaz:

http://localhost:3000/api/docs/

Especificación OpenAPI:

http://localhost:3000/api/docs/openapi.json

Swagger permite consultar los esquemas, probar endpoints y configurar la autenticación Bearer JWT desde el botón Authorize.

## Validaciones y manejo de errores

La API utiliza Zod para validar las entradas.

Códigos HTTP utilizados:

| Código | Descripción |
|---|---|
| 200 | Solicitud exitosa |
| 201 | Recurso creado |
| 204 | Recurso eliminado |
| 400 | Datos inválidos |
| 401 | Autenticación requerida o inválida |
| 404 | Recurso no encontrado |
| 409 | Correo ya registrado |
| 500 | Error interno |
| 503 | Base de datos no disponible |

## Pruebas realizadas

Se comprobaron las siguientes operaciones:

- Consulta y creación de tareas.
- Actualización y eliminación de tareas.
- Validación de títulos vacíos.
- Rechazo de actualizaciones vacías.
- Consulta de tareas inexistentes.
- Registro e inicio de sesión.
- Rechazo de correos duplicados.
- Protección de rutas mediante JWT.
- Rechazo de tokens inválidos.
- Expiración de tokens.
- Documentación OpenAPI generada a partir de esquemas Zod.

## Seguridad

- Contraseñas almacenadas mediante bcrypt.
- Tokens JWT firmados y con expiración.
- Validación de datos con Zod.
- Acceso a Supabase desde el servidor.
- Variables sensibles gestionadas en `.env`.
- Rutas de tareas protegidas mediante middleware.
- Control de errores HTTP.

## Patrones aplicados

### Repository

Encapsula las operaciones sobre Supabase, separando la persistencia de la lógica de negocio.

### Inyección de dependencias

Las dependencias se construyen manualmente:

Repository → Service → Controller.

### Separación de responsabilidades

Cada módulo mantiene archivos independientes para rutas, lógica de negocio, persistencia, validación y documentación.

## Estado del proyecto

Implementación de API REST, CRUD, Supabase, autenticación JWT y documentación Swagger completada y verificada mediante pruebas manuales.

## Licencia

Proyecto desarrollado con fines educativos.
