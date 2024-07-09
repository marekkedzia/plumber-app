import {ZodSchema} from "zod"
import {NextFunction, Request, Response} from "express"
import {InvalidBodyError, InvalidQueryError} from "../error/errors";

const validateBody = (schema: ZodSchema) =>
    (req: Request, _: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body)
            return next()
        } catch (error: any) {
            throw new InvalidBodyError(JSON.stringify({...error.issues}))
        }
    }
const validateQuery = (schema: ZodSchema) =>
    (req: Request, _: Response, next: NextFunction) => {
        try {
            req.query = schema.parse(req.query)
            return next()
        } catch (error: any) {
            throw new InvalidQueryError(JSON.stringify({...error.issues}))
        }
    }

export {validateBody, validateQuery};
