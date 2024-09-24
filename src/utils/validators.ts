import {ZodSchema} from "zod"
import {Request} from "express"
import {InvalidBodyError, InvalidQueryError} from "../error/errors";

const validateBody = (schema: ZodSchema) =>
    (req: Request) => {
        try {
            req.body = schema.strict().parse(req.body)
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
