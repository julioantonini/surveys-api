import { MissingParamError } from "./../../errors/missing-param-error";
import { RequiredFieldValidation } from "./required-field-validation";

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation("any_field");

describe("Required Field Validation", () => {
  test("Should return a missingParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "any_name" });
    expect(error).toEqual(new MissingParamError("any_field"));
  });

  test("Should not returns if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({ any_field: "any_field" });
    expect(error).toBeFalsy();
  });
});
