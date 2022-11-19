import { LoadSurveysRepository } from '@/data/protocols'
import { LoadSurveys } from '@/domain/usercases'
import { SurveyModel } from '@/domain/models'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
