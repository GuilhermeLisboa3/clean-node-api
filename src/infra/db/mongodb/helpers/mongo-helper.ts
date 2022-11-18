import { Collection, MongoClient, ObjectId } from 'mongodb'

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
  map (data: any): any {
    const { _id, ...rest } = data
    return Object.assign({}, rest, { id: _id.toString() })
  },
  parseToObjectId (value: string): ObjectId {
    return new ObjectId(value)
  },
  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  },
  SurveyMap (collection: any): any {
    const { surveyId, ...data } = collection
    return Object.assign({}, data, { surveyId: surveyId.toString() })
  }
}
