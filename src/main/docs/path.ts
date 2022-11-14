import { loginPath, surveyPath, singUpPath, surveyResultPath } from './path/'
export default {
  '/login': loginPath,
  '/signup': singUpPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath

}
