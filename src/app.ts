import {Plumber, RouterPath} from '@marekkedzia/plumber-router';
import express, {Express, Router} from "express";
import "express-async-errors";
import cors from "cors";
import {healthRouter} from "./health.router";
import {unless} from "./utils/unless";
import {InternalStorage} from "./internal.storage/internal.storage";
import {errorHandler} from "./error/error.handler";


type AppConfig = {
    cors?: string;
    urlPrefix?: RouterPath;
    routers?: Plumber[];
    auth?: {
        middleware: express.RequestHandler;
        unless: RouterPath[];
    }[];
}

function getPlumberApp(config?: AppConfig): Express {
    const app = express();
    const routers: Router[] = config?.routers?.map(c => c.router) || [];
    const authMiddleware: express.RequestHandler[] = config?.auth?.map(a => unless(a.unless, a.middleware)) || [];

    app.disable("x-powered-by")
        .use(cors(config?.cors ? {origin: config.cors} : {}))
        .use(express.json())
        .use(InternalStorage.startStorage)
        .use(healthRouter);

    authMiddleware.forEach(middleware => app.use(middleware));
    routers.forEach(router => app.use(router));

    app.use(errorHandler);

    return app;
}


export {getPlumberApp};
