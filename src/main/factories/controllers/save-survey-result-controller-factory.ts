import { makeLogControllerDecorator, makeDbLoadAnswerBySurvey, makeDbSaveSurveyResult } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { SaveSurveyResultController } from '@/presentation/controllers'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadAnswerBySurvey(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
