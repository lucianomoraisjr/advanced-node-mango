import { JwtTokenHandle } from '@/infra/crypto'
import { env } from '@/main/config/env'

export const makeJwtTokenHandle = (): JwtTokenHandle => {
  return new JwtTokenHandle(env.jwtSecret)
}
