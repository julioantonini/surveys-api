import { RequiredFieldValidation } from "./../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../presentation/controllers/signup/signup-protocols";
import { ValidationComposite } from "./../../presentation/helpers/validators/validation-composite";

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
