import { Lifetime } from "awilix";

import { DependencyType, DIKeys } from "./ioc.enums";
import { IDependency } from "./ioc.interfaces";

import { LoggingService } from "../services/logging.service";

/**
 * IoC definition
 */
export const IoCConfiguration: IDependency[] = [
    {
        name: DIKeys.LoggingService,
        instance: LoggingService,
        lifetime: Lifetime.SINGLETON,
        type: DependencyType.ClassOrService,
    },
];
