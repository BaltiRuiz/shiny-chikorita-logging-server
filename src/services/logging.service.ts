import winston from "winston";

import { LogLevel } from "../enums/logging.enums";

export class LoggingService {
    private colorsConfig: winston.config.AbstractConfigSetColors;
    private levels: winston.config.AbstractConfigSetLevels;
    private format: winston.Logform.Format;
    private transports: winston.transport[];

    private logger: winston.Logger;

    /**
     * Defines different colors for each level
     * 
     * @private
     * 
     * @memberof LoggingService
     */
    private addColorsConfiguration() {
        this.colorsConfig = {
            error: "red",
            warn: "warn",
            info: "green",
            http: "magenta",
            debug: "white",
        }

        winston.addColors(this.colorsConfig);
    }

    /**
     * Defines the format of the messages
     * 
     * @private
     * 
     * @memberof LoggingService
     */
    private createLoggingFormat() {
        this.format = winston.format.combine(
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
            winston.format.colorize({ all: true }),
            winston.format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`),
        );
    }

    /**
     * Defines which transports the logger must use to print out the messages
     * 
     * @private
     * 
     * @memberof LoggingService
     */
    private createLoggingTransports() {
        this.transports = [
            new winston.transports.Console()
        ];
    }

    /**
     * Sets a custom severity level system
     * 
     * @private
     * 
     * @memberof LoggingService
     */
    private defineSeverityLevels() {
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            debug: 4,
        }
    }

    /**
     * Sets the severity level based on the NODE_ENV variable
     * 
     * @private
     * 
     * @memberof LoggingService
     */
    private defineEnvironmentLoggingLevel() {
        const environment = process.env.NODE_ENV || "development";
        const isDevelopment = environment === "development";

        return isDevelopment ? LogLevel.Debug : LogLevel.Info;
    }

    /**
     * Initialises the logging service
     * 
     * @private
     * 
     * @memberof LoggingService
     */
    private init() {
        this.addColorsConfiguration();
        this.defineSeverityLevels();
        this.createLoggingFormat();
        this.createLoggingTransports();

        this.logger = winston.createLogger({
            levels: this.levels,
            level: this.defineEnvironmentLoggingLevel(),
            format: this.format,
            transports: this.transports,
        });
    }

    /**
     * Logs a new message
     *
     * @param {LogLevel} logLevel Importance of the message
     * @param {string} message
     * 
     * @memberof LoggingService
     */
    public logMessage(logLevel: LogLevel, message: string) {
        this.logger.log(logLevel, message);
    }

    /**
     * Creates an instance of LoggingService
     * 
     * @memberof LoggingService
     */
    constructor() {
        this.init();
    }
}
