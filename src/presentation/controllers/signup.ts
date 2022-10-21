import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverRequest } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpResponse, HttpRequest } from '../protocols'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return {
        body: '',
        statusCode: 200
      }
    } catch (error) {
      return serverRequest()
    }
  }
}
