
import { ServerError, UnauthorizedError } from '@/application/errors'

export type HttpResponse = {
  statusCode: number
  data: any

}
export const ok = (dataParams: any): HttpResponse => ({
  statusCode: 200,
  data: dataParams
})
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})
export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const serverError = (error: any): HttpResponse => ({
  statusCode: 500,
  data: new ServerError(error)
})
