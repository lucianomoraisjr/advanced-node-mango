import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeJwtTokenHandle } from '@/main/factories/crypto'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const jwt = makeJwtTokenHandle()
  return new AuthenticationMiddleware(jwt.validateToken.bind(jwt))
}
