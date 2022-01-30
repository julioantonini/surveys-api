import { EmailValidator } from "./../../protocols/email-validator";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }

    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError("password"));
    }

    const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);

    if (!isValidEmail) {
      return badRequest(new InvalidParamError("email"));
    }
  }
}
