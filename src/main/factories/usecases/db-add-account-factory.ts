import { AccountMongoRepository } from '@/infra/db/mongodb'
import { BcryptAdapter } from '@/infra/criptography'
import { AddAccount } from '@/domain/usercases'
import { DbAddAccount } from '@/data/usercases'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
