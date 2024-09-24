import {ZodSchema, ZodObject, ZodRawShape} from "zod"
import {Request} from "express"
import {InvalidBodyError, InvalidQueryError} from "../error/errors";

const validateBody = (schema: ZodSchema | ZodObject<ZodRawShape>) =>
    (req: Request) => {
        try {
            if (schema instanceof ZodObject) {
                req.body = schema.strict().parse(req.body);
            } else {
                req.body = schema.parse(req.body);
            }
        } catch (error: any) {
            throw new InvalidBodyError(JSON.stringify({...error.issues}))
        }
    }
const validateQuery = (schema: ZodSchema) =>
    (req: Request) => {
        try {
            req.query = schema.strict().parse(req.query)
        } catch (error: any) {
            throw new InvalidQueryError(JSON.stringify({...error.issues}))
        }
    }

export {validateBody, validateQuery};
