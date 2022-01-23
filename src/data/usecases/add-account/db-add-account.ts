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
    const accountWithHashedPassword = Object.assign({}, accountData, {
      password: hashedPassword,
    });
    const account = await this.addAccountRepository.add(
      accountWithHashedPassword
    );
    return account;
  }
}
