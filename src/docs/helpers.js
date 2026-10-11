
import { z } from 'zod';

// Convertir un esquema Zod a JSON Schema
export function toSchema(schema) {
    return z.toJSONSchema(schema);
}

// Documentar el cuerpo de una solicitud
export function jsonBody(schema) {
    return {
        required: true,
        content: {
            'application/json': {
                schema
            }
        }
    };
}

// Documentar una respuesta JSON
export function jsonResponse(description, schema) {
    return {
        description,
        content: {
            'application/json': {
                schema
            }
        }
    };
}

// Documentar una respuesta de error
export function errorResponse(description) {
    return jsonResponse(description, {
        $ref: '#/components/schemas/Error'
    });
}

// Documentar el parámetro ID
export function idParam() {
    return {
        name: 'id',
        in: 'path',
        required: true,
        description: 'ID de la tarea',
        schema: {
            type: 'integer',
            minimum: 1
        },
        
        example: 1

    };
}

export function secure(paths) {
    const result = {};

    for (const [path, item] of Object.entries(paths)) {
        result[path] = {};

        for (const [key, value] of Object.entries(item)) {
            result[path][key] =
                key === 'parameters'
                    ? value
                    : {
                        ...value,
                        security: [{ bearerAuth: [] }],
                        responses: {
                            ...value.responses,
                            401: errorResponse(
                                'Token faltante, inválido o expirado'
                            )
                        }
                    };
        }
    }

    return result;
}

