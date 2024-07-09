import {RequestId} from "../utils/id.utils";

type StorageContext = {
    requestId: RequestId;
    customStorage: { [key: string]: unknown }
}

export {StorageContext};
