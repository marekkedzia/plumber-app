import {AppError} from "../error/error";

function getOrThrow<T>(property: T | undefined, appError: AppError): T {
    if (property === undefined) {
        throw appError
    }
    return property
}

export {getOrThrow};
