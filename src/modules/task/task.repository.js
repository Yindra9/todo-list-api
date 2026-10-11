
import { unwrap } from '../../lib/supabase.js';

const TABLE = 'tasks';

export function createTaskRepository(db) {
    return {
        async findAll() {
            return unwrap(
                await db.from(TABLE).select('*')
            );
        },

        async findById(id) {
            return unwrap(
                await db.from(TABLE)
                    .select('*')
                    .eq('id', id)
                    .maybeSingle()
            );
        },

        async create(data) {
            return unwrap(
                await db.from(TABLE)
                    .insert(data)
                    .select('*')
                    .single()
            );
        },

        async update(id, data) {
            return unwrap(
                await db.from(TABLE)
                    .update(data)
                    .eq('id', id)
                    .select('*')
                    .maybeSingle()
            );
        },

        async remove(id) {
            return unwrap(
                await db.from(TABLE)
                    .delete()
                    .eq('id', id)
                    .select('*')
                    .maybeSingle()
            );
        }
    };
}
