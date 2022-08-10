import { AuthenticationError } from '@/domain/entities/errors'
import { LoadFacebookUser } from '@/domain/contracts/gateways'
import { LoadUserAccount, SaveFacebookAccount } from '../contracts/repos'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { TokenGenerator } from '../contracts/gateways'

type Setup = (
  facebook: LoadFacebookUser,
  userAccountRepo: LoadUserAccount & SaveFacebookAccount,
  token: TokenGenerator
) => FacebookAuthentication
type Params = {token: string}
type Result = AccessToken | AuthenticationError

export type FacebookAuthentication = (params: Params) => Promise<Result>

export const setupFacebookAuthentication: Setup = (facebook, userAccountRepo, token) => async params => {
  const fbData = await facebook.loadUser(params)
  if (fbData !== undefined) {
    const accountData = await userAccountRepo.load({ email: fbData.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    const { id } = await userAccountRepo.saveWithFaceboook(fbAccount)
    const accessToken = await token.generate({ key: id, expirationInMs: AccessToken.expirationInMs })
    return new AccessToken(accessToken)
  }
  return new AuthenticationError()
}
