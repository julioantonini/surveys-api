import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";
import { httpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}
  handle(httpRequest: httpRequest): HttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError("email"));
      }
    } catch (error) {
      return serverError();
    }
  }
}
