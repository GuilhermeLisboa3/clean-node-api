import { MongoHelper as sut } from './mongo-helper'
describe('Mongo Helper', () => {
  beforeAll(async () => {
    if (typeof process.env.MONGO_URL === 'string') {
      await sut.connect(process.env.MONGO_URL)
    }
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  it('should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
