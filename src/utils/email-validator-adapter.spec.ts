import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("Email Validator Adapter", () => {
  test("Shoud return false if validator returns false", async () => {
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const sut = new EmailValidatorAdapter();
    const isValid = await sut.isValid("invalid_email");
    expect(isValid).toBe(false);
  });

  test("Shoud return true if validator returns true", async () => {
    const sut = new EmailValidatorAdapter();
    const isValid = await sut.isValid("valid_email@mail.com");
    expect(isValid).toBe(true);
  });
});
