import { TokenGenerator } from "./../../protocols/criptography/token-generator";
import { HashComparer } from "./../../protocols/criptography/hash-comparer";
import { LoadAccountByEmailRepository } from "./../../protocols/db/load-account-by-email-repository";
import {
  Authentication,
  AuthenticationModel,
} from "./../../../domain/usecases/authentication";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    );

    if (!account) return null;

    const isValidPassword = await this.hashComparer.compare(
      authentication.password,
      account.password
    );

    if (!isValidPassword) return null;

    const accessToken = await this.tokenGenerator.generate(account.id);
    return accessToken;
  }
}
