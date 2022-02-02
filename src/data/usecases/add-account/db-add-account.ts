import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Hasher,
} from "./db-add-account-protocol";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const accountWithHashedPassword = Object.assign({}, accountData, {
      password: hashedPassword,
    });
    const account = await this.addAccountRepository.add(
      accountWithHashedPassword
    );
    return account;
  }
}
