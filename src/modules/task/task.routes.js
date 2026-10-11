
import { Router } from 'express';
import { supabase } from '../../lib/supabase.js';
import { validate } from '../../middlewares/validate.js';

import { createTaskRepository } from './task.repository.js';
import { createTaskService } from './task.service.js';
import { createTaskController } from './task.controller.js';

import {
    createTaskSchema,
    updateTaskSchema,
    taskIdParams
} from './task.schema.js';
import { requireAuth } from '../../middlewares/auth.js';

// Inyección de dependencias
const repository = createTaskRepository(supabase);
const service = createTaskService(repository);
const controller = createTaskController(service);

export const tasksRouter = Router();
tasksRouter.use(requireAuth);

// Listar todas las tareas
tasksRouter.get('/', controller.list);

// Obtener tarea por ID
tasksRouter.get(
    '/:id',
    validate(taskIdParams, 'params'),
    controller.getById
);

// Crear tarea
tasksRouter.post(
    '/',
    validate(createTaskSchema),
    controller.create
);

// Actualizar tarea
tasksRouter.patch(
    '/:id',
    validate(taskIdParams, 'params'),
    validate(updateTaskSchema),
    controller.update
);

// Eliminar tarea
tasksRouter.delete(
    '/:id',
    validate(taskIdParams, 'params'),
    controller.remove
);
