import * as core from "express-serve-static-core";
import bodyParser from "body-parser";

import { logMessage } from "./endpoints/log.endpoints";

const routes = (app: core.Express) => {
    const jsonParser = bodyParser.json();

    app.post("/log", jsonParser, logMessage);
}

export default routes;
