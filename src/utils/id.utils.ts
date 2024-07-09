import {Opaque} from "ts-opaque";
import {randomUUID} from "crypto";

type RequestId = Opaque<string, "requestId">

enum IdPrefix {
    REQUEST = "req",
}

class IdUtils {
    private static provideId<T>(prefix: IdPrefix, suffixLength = 6): T {
        return `${prefix}_${Date.now()}_${randomUUID().slice(0, suffixLength)}` as T;
    }

    public static provideRequestId = (): RequestId => IdUtils.provideId<RequestId>(IdPrefix.REQUEST);
}

export {RequestId, IdUtils};
