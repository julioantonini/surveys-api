import { AccountModel } from "../../usecases/add-account/db-add-account-protocol";

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>;
}
