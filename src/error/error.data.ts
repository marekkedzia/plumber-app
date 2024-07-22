import {config} from "../config";

export enum ErrorData {
    INTERNAL_SERVER_ERROR = "Internal error, we are working on it",
    INVALID_BODY = "Invalid body, please check your request and try again",
    INVALID_QUERY = "Invalid query, please check your request and try again",
    FORBIDDEN = "You are not allowed to access this resource",
    ID_PREFIX = `ID prefix must match ${config.idPrefixRegex.toString()}`
}
