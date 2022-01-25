import { cors } from "./../midlewares/cors";
import { Express } from "express";
import { bodyParser } from "../midlewares/body-parser";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
};
