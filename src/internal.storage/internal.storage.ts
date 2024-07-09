import {AsyncLocalStorage} from "async_hooks";
import {NextFunction, Request, Response} from "express";
import {IdUtils, RequestId} from "../utils/id.utils";
import {StorageContext} from "./storage.context";
import {getOrThrow} from "../utils/get.or.throw";
import {InternalError} from "../error/error";

class InternalStorage {
    private static localStorage = new AsyncLocalStorage<StorageContext>();

    static startStorage = (_: Request, __: Response, next: NextFunction): void => {
        this.localStorage.enterWith({
            requestId: IdUtils.provideRequestId(),
            customStorage: {}
        });

        next();
    };

    static getRequestId = (): RequestId =>
        getOrThrow(this.localStorage.getStore(), new InternalError()).requestId;

    static getCustomStorage = (): { [key: string]: unknown } =>
        getOrThrow<StorageContext>(this.localStorage.getStore(), new InternalError()).customStorage;

    static setCustomStorage = (key: string, value: unknown): void => {
        const customStorage = this.getCustomStorage();
        customStorage[key] = value;
    }
}

export {InternalStorage};
