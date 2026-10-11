
import { healthDocs } from '../modules/health/health.docs.js';
import { taskDocs } from '../modules/task/task.docs.js';
import { authDocs } from '../modules/auth/auth.docs.js';

// Módulos de documentación
const modules = [healthDocs, authDocs, taskDocs];

export const openapi = {

    // Versión de OpenAPI
    openapi: '3.1.0',

    // Información general
    info: {
        title: 'Todo List API',
        version: '1.0.0',
        description: 'API REST con Express, Zod, Supabase y autenticación JWT'
    },

    // Servidor principal
    servers: [
        {
            url: '/api',
            description: 'Servidor de la API'
        }
    ],

    // Categorías de Swagger
    tags: modules.flatMap(
        module => module.tags ?? []
    ),

    // Rutas de todos los módulos
    paths: Object.assign(
        {},
        ...modules.map(module => module.paths ?? {})
    ),

    // Componentes reutilizables
    components: {

        // Autenticación JWT
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
               
            }
        },

        // Esquemas de datos
        schemas: {

            // Esquema general de errores
            Error: {
                type: 'object',
                properties: {
                    error: {
                        description: 'Información del error',
                        oneOf: [
                            { type: 'string' },
                            {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string'
                                    },
                                    details: {
                                        type: 'array',
                                        items: {
                                            type: 'object'
                                        }
                                    }
                                }
                            }
                        ]
                    },

                    details: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                field: {
                                    type: 'string'
                                },
                                message: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },

            // Esquemas de Health, Auth y Tasks
            ...Object.assign(
                {},
                ...modules.map(module => module.schemas ?? {})
            )
        }
    }
};
