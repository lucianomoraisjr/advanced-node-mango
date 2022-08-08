import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis/facebook'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '../crypto/token-generator'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenGenerator()
  )
}
