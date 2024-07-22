import {Opaque} from "ts-opaque";
import {randomUUID} from "crypto";
import {config} from "../config";
import {IdPrefixError} from "../error/errors";

type RequestId = Opaque<string, "requestId">

type IdPrefix = Opaque<string, "id-prefix">

function IdPrefix(prefix: string): IdPrefix {
    if (!config.idPrefixRegex.test(prefix)) {
        throw new IdPrefixError();
    }

    return prefix as IdPrefix;
}

const requestIdPrefix = IdPrefix(config.reqIdPrefix);

class IdUtils {
    protected static provideId<T>(prefix: IdPrefix, suffixLength = 6): T {
        return `${prefix}_${Date.now()}_${randomUUID().slice(0, suffixLength)}` as T;
    }

    public static provideRequestId = (): RequestId => IdUtils.provideId<RequestId>(requestIdPrefix);
}

export {RequestId, IdUtils, IdPrefix};
