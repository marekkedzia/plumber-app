import {HttpStatus} from "../utils/http.status";
import {ErrorCode} from "./error.code";
import {ErrorData} from "./error.data";

export interface AppError {
    status: number,
    code?: string,
    data?: string
}

export class InternalError implements AppError {
    status = HttpStatus.INTERNAL_SERVER_ERROR;
    code = ErrorCode.INTERNAL_SERVER_ERROR;
    data = ErrorData.INTERNAL_SERVER_ERROR;
}

export class InvalidBodyError implements AppError {
    status = HttpStatus.BAD_REQUEST;
    code = ErrorCode.INVALID_BODY;
    data;

    constructor(message: string) {
        this.data = `${ErrorData.INVALID_BODY}: ${message}`;
    }
}

export class InvalidQueryError implements AppError {
    status = HttpStatus.BAD_REQUEST;
    code = ErrorCode.INVALID_QUERY;
    data;

    constructor(message: string) {
        this.data = `${ErrorData.INVALID_QUERY}: ${message}`;
    }
}

export class ForbiddenError implements AppError {
    status = HttpStatus.FORBIDDEN;
    code = ErrorCode.FORBIDDEN;
    data = ErrorData.FORBIDDEN;
}

export class IdPrefixError implements AppError {
    status = HttpStatus.INTERNAL_SERVER_ERROR;
    code = ErrorCode.ID_PREFIX;
    data = ErrorData.ID_PREFIX;
}
