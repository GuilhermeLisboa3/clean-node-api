import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadSurveys } from '@/domain/usercases'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurves: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurves.load(httpRequest.accountId)
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
