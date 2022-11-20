import { MongoHelper } from './mongo-helper'
import { CheckAccountByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository, UpdatedAccessTokenRepository, LoadAccountByTokenRepository } from '@/data/protocols'

export class AccountMongoRepository implements
AddAccountRepository,
LoadAccountByEmailRepository,
UpdatedAccessTokenRepository,
LoadAccountByTokenRepository,
CheckAccountByEmailRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    const account = await accountCollection.findOne({ _id: result.insertedId })
    return account != null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account != null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const objectId = MongoHelper.parseToObjectId(id)
    await accountCollection.updateOne({
      _id: objectId
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        _id: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
