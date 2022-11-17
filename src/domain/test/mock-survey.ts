import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usercases/survey/add-survey'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  }
}

export const mockSurveysModels = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }]
}

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: ' any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})
