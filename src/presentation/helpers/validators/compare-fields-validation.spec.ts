import { InvalidParamError } from "./../../errors/invalid-param-error";
import { MissingParamError } from "./../../errors/missing-param-error";
import { CompareFieldsValidation } from "./compare-fields-validation";

const makeSut = (): CompareFieldsValidation =>
  new CompareFieldsValidation("field", "field_to_compare");

describe("Compare Fields Validation", () => {
  test("Should return a invalid param error if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "any_value",
      field_to_compare: "wrong_value",
    });
    expect(error).toEqual(new InvalidParamError("field_to_compare"));
  });

  test("Should not returns if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "any_value",
      field_to_compare: "any_value",
    });
    expect(error).toBeFalsy();
  });
});
