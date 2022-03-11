import * as express from 'express';

export default class AppConfiguration {
    public setResponseHeaders(app: express.Application): void {
        app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
            //Sitios a los que se desea dar acceso.
            response.setHeader('Access-Control-Allow-Origin', '*');
            //Tipo de solicitudes que se van a permitir.
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            //Encabezados de solicitudes permitidas.
            response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');
            //Ajustar a 'True' si se desea que el sitio incluya cookies en las solicitudes enviadas al sitio a través del API.
            //P. ej.: si se usan sesiones.
            response.setHeader('Access-Control-Allow-Credentials', 'true');
            //Tipo de contenido.
            response.setHeader('Content-Type', 'application/json');
            //Continuamos con el siguiente middleware.
            next();
        });
    }
    public unhandledRejection(): void {
        process.on('unhandledRejection', (reason, promise) => {
            console.error('[SERVER][APP][Unhandled Rejection] At:', promise, 'reason:', reason);
        });
    }
}