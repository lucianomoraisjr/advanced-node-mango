import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeJwtTokenHandle } from '@/main/factories/gateways'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const jwt = makeJwtTokenHandle()
  return new AuthenticationMiddleware(jwt.validate.bind(jwt))
}
