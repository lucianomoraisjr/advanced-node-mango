
import { ServerError, UnauthorizedError } from '@/application/errors'

export type HttpResponse<T=any> = {
  statusCode: number
  data: T

}
export const ok = <T=any> (dataParams: T): HttpResponse<T> => ({
  statusCode: 200,
  data: dataParams
})
export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})
export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const serverError = (error: any): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error)
})
