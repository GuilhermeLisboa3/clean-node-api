import { LoadSurveyByIdRepository } from '@/data/protocols'
import { LoadSurveyById } from '@/domain/usecases'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRespository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<LoadSurveyById.Result> {
    return this.loadSurveyByIdRespository.loadById(id)
  }
}
