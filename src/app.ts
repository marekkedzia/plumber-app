import {Plumber, RouterPath} from '@marekkedzia/plumber-router/src';
import express, {Router} from "express";
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

function getPlumberApp(config?: AppConfig) {
    const routers: Router[] = config?.routers?.map(c => c.router) || [];
    const auth: express.RequestHandler[] = config?.auth?.map(a => unless(a.unless, a.middleware)) || [];

    return express()
        .disable("x-powered-by")
        .use(cors(config?.cors ? {origin: config.cors} : {}))
        .use(express.json())
        .use(InternalStorage.startStorage)
        .use(healthRouter)
        .use(auth)
        .use(routers)
        .use(errorHandler)
}

export {getPlumberApp};
