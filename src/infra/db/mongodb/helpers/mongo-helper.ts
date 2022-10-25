import { Collection, InsertOneResult, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  },
  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },
  map (collection: any, collectionMongoDbId: InsertOneResult<Document>): any {
    const { _id, ...collectionWithoutId } = Object.assign({}, collection, { id: collectionMongoDbId.insertedId.toString() })
    console.log(collectionWithoutId)
    return collectionWithoutId
  }
}
