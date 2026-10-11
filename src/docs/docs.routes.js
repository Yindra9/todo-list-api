
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openapi } from './openapi.js';

export const docsRouter = Router();

// Documento OpenAPI en JSON
docsRouter.get('/openapi.json', (req, res) => {
    res.json(openapi);
});

// Interfaz Swagger UI
docsRouter.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(openapi, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true
        }
    })
);
