import { AuthenticationMiddleware } from '@/application/middlewares'
import { setupAuthorize } from '@/domain/use-cases'
import { makeJwtTokenHandle } from '../crypto/token-generator'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const authorize = setupAuthorize(makeJwtTokenHandle())
  return new AuthenticationMiddleware(authorize)
}
