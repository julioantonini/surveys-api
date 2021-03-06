import { Collection, ObjectId } from "mongodb";
import env from "../../../../main/config/env";
import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account";

let accountCollection: Collection;

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test("should return an account on add success", async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@mail.com");
    expect(account.password).toBe("any_password");
  });

  test("should return an account on loadByEmail success", async () => {
    await accountCollection.insertOne({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
    const sut = makeSut();
    const account = await sut.loadByEmail("any_email@mail.com");
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@mail.com");
    expect(account.password).toBe("any_password");
  });

  test("should return null if loadByEmail fails", async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail("any_email@mail.com");
    expect(account).toBeFalsy();
  });

  test("should update the account accessToken on updateAccessToken success", async () => {
    const accountId = (
      await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      })
    ).insertedId.toString();

    const sut = makeSut();
    await sut.updateAccessToken(accountId, "any_token");
    const account = await accountCollection.findOne({
      _id: new ObjectId(accountId),
    });

    expect(account).toBeTruthy();
    expect(account.accessToken).toBe("any_token");
  });
});
