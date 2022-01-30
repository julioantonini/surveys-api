import { EmailValidator } from "./../../protocols/email-validator";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return badRequest(new MissingParamError("email"));
      }

      if (!password) {
        return badRequest(new MissingParamError("password"));
      }

      const isValidEmail = this.emailValidator.isValid(email);
      if (!isValidEmail) {
        return badRequest(new InvalidParamError("email"));
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
