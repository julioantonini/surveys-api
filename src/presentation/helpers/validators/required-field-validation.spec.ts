import { MissingParamError } from "./../../errors/missing-param-error";
import { RequiredFieldValidation } from "./required-field-validation";

describe("Required Field Validation", () => {
  test("Should return a missingParamError if validation fails", () => {
    const sut = new RequiredFieldValidation("any_field");
    const error = sut.validate({ field: "any_name" });
    expect(error).toEqual(new MissingParamError("any_field"));
  });

  test("Should not returns if validation succeeds", () => {
    const sut = new RequiredFieldValidation("any_field");
    const error = sut.validate({ any_field: "any_field" });
    expect(error).toBeFalsy();
  });
});
