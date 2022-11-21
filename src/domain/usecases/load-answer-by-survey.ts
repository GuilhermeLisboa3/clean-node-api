export interface LoadAnswerBySurvey {
  loadAnswers: (id: string) => Promise<LoadAnswerBySurvey.Result>
}

export namespace LoadAnswerBySurvey {
  export type Result = string[]
}
