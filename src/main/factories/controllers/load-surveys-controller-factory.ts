import { makeDbLoadSurveys, makeLogControllerDecorator } from '@/main/factories'
import { LoadSurveysController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
