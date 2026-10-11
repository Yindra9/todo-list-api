
import { z } from 'zod';

// Crear una tarea
export const createTaskSchema = z.object({
    title: z.string()
        .trim()
        .min(1, 'Title is required')
        .max(100)
        .meta({ example: 'Preparar la demo' }),

    description: z.string().trim().optional(),

    done: z.boolean().optional()
});

// Actualizar una tarea
export const updateTaskSchema = createTaskSchema
    .partial()
    .refine(
        data => Object.keys(data).length > 0,
        { message: 'At least one field is required' }
    );

// Validar el ID de la URL
export const taskIdParams = z.object({
    id: z.coerce.number().int().positive()
});

// Esquema de respuesta para Swagger
export const taskSchema = z.object({
    id: z.number().int().meta({
        example: 1
    }),

    title: z.string().meta({
        example: 'Preparar la demo'
    }),

    description: z.string().nullable().meta({
        example: 'Ensayar cada paso'
    }),

    done: z.boolean().meta({
        example: false
    }),

    created_at: z.string().meta({
        format: 'date-time',
        example: '2026-10-01T12:00:00Z'
    })
});

