import { HttpError } from '../utils/http-error.js';

// Valida req.body o req.params con un schema de zod y lo reemplaza por el dato ya limpio/convertido.

export const validate = (schema, source = 'body') =>
    (req, res, next) => {

        const result = schema.safeParse(req[source]);

        if (!result.success) {
            const details = result.error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }));

            return res.status(400).json({
                error: 'Validation failed',
                details
            });
        }

        if (source === 'body') {
            req.body = result.data;
        } else if (source === 'params') {
            req.params = result.data;
        }

        next();
    };
