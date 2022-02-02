import {
  AccountModel,
  AddAccountModel,
} from "../../usecases/add-account/db-add-account-protocol";

export interface AddAccountRepository {
  add(account: AddAccountModel): Promise<AccountModel>;
}
