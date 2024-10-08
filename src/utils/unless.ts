import {Request, Response, NextFunction} from "express";
import {RouterPath} from "@marekkedzia/plumber-router";

const unless = (paths: RouterPath[], middleware: (req: Request, res: Response, next: NextFunction) => void) =>
    (req: Request, res: Response, next: NextFunction) => paths.includes(req.path as RouterPath) ? next() : middleware(req, res, next);

export {unless};
