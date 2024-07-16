import winston from 'winston';

class Logger {
    private static instance: winston.Logger;

    private static getInstance(level: string = 'info'): winston.Logger {
        if (!Logger.instance) {
            const transports = [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.label({label: "Backend"}),
                        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                        winston.format.printf(({level, message, label, timestamp}) =>
                            `${level.toUpperCase()} ${timestamp} [${label}]: ${message}`)
                    ),
                    level,
                })
            ];

            Logger.instance = winston.createLogger({
                level,
                transports,
                exitOnError: false,
            });
        }

        return Logger.instance;
    }

    static error = (msg: string, details?: any, level?: string) => Logger.getInstance(level).error(msg, details)
    static info = (msg: string, details?: any, level?: string) => Logger.getInstance(level).info(msg, details)
    static warn = (msg: string, details?: any, level?: string) => Logger.getInstance(level).warn(msg, details)
    static debug = (msg: string, details?: any, level?: string) => Logger.getInstance(level).debug(msg, details)
    static silly = (msg: string, details?: any, level?: string) => Logger.getInstance(level).silly(msg, details)
}

export {Logger};
