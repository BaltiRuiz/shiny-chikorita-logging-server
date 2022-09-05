import { Request, Response } from "express";

import { DIKeys } from "../ioc/ioc.enums";

import { AppContainerInstance } from "../ioc/ioc.init";

import { LoggingService } from "../services/logging.service";

export const logMessage = async (req: Request, res: Response) => {
    try {
        const { logLevel, message } = req.body;

        const loggingService: LoggingService = AppContainerInstance.getContainerItem(
            DIKeys.LoggingService,
        );
    
        loggingService.logMessage(logLevel, message);
    
        res.status(204).send();
    } catch (error) {
        res.status(500).send("There was an internal error while logging the message");
    }
}
