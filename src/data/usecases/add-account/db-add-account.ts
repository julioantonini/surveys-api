import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from "./db-add-account-protocol";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    console.debug({ hashedPassword });
    const account = Object.assign({}, accountData, {
      password: hashedPassword,
    });
    await this.addAccountRepository.add(account);
    return new Promise((resolve) => resolve(null));
  }
}
