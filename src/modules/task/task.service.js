
import { HttpError } from '../../utils/http-error.js';

export function createTaskService(repository) {
    return {
        async list() {
            return repository.findAll();
        },

        async getById(id) {
            const task = await repository.findById(id);

            if (!task) {
                throw new HttpError(404, 'Task not found');
            }

            return task;
        },

        async create(data) {
            return repository.create(data);
        },

        async update(id, data) {
            const task = await repository.update(id, data);

            if (!task) {
                throw new HttpError(404, 'Task not found');
            }

            return task;
        },

        async remove(id) {
            const task = await repository.remove(id);

            if (!task) {
                throw new HttpError(404, 'Task not found');
            }

            return task;
        }
    };
}
