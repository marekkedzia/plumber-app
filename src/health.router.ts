import {Plumber, RouterPath, Filter} from '@marekkedzia/plumber-router/src';
import {config} from "./config";

class HealthController {
    plumber: Plumber;

    constructor() {
        this.plumber = new Plumber({path: RouterPath(config.healthCheckPath)});
        this.plumber.register<string>("get", [this.getHealthFilter]);
    }

    private getHealthFilter = Filter(
        () => config.healthCheckResponse
    );
}

export const healthRouter = new HealthController().plumber.router;
