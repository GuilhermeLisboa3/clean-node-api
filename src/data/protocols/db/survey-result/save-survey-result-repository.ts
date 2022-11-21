import { SaveSurveyResult } from '@/domain/usecases'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResult.Params) => Promise<void>
}

export namespace SaveSurveyResultRepository {
  export type Params = SaveSurveyResult.Params
}
