import { cors } from "./../midlewares/cors";
import { Express } from "express";
import { bodyParser } from "../midlewares/body-parser";
import { contentType } from "../midlewares/content-type";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
