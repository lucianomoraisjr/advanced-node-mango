import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/gateways/facebook'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenHandle } from '@/main/factories/gateways'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandle()
  )
}
