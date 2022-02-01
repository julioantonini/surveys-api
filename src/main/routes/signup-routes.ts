import { adaptRoute } from "./../adapters/express-route-adapter";
import { Router } from "express";
import { makeSignUpController } from "../factories/signup/signup";

export default (router: Router): void => {
  router.post("/signup", adaptRoute(makeSignUpController()));
};
