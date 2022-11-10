import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/usercases/load-survey-by-id'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRespository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRespository.loadById(id)
    return survey
  }
}
