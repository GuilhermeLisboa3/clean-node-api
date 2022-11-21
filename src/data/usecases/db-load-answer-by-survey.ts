import { LoadSurveyByIdRepository } from '@/data/protocols'
import { LoadAnswerBySurvey } from '@/domain/usecases'

export class DbLoadAnswerBySurvey implements LoadAnswerBySurvey {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadAnswers (id: string): Promise<LoadAnswerBySurvey.Result> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey?.answers.map(a => a.answer) || []
  }
}
