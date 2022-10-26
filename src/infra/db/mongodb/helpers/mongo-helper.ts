import { Collection, InsertOneResult, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async disconnect (): Promise<void> {
    if (this.client) await this.client.close()
    this.client = null
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map (collection: any, collectionMongoDbId: InsertOneResult<Document>): any {
    const { _id, ...collectionWithoutId } = Object.assign({}, collection, { id: collectionMongoDbId.insertedId.toString() })
    return collectionWithoutId
  }
}
