import { SaveSurveyResult, SaveSurveyResultParams, LoadSurveyResultRepository, SurveyResultModel, SaveSurveyResultRepository } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly LoadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.LoadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
    return surveyResult
  }
}
