import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

export class FacebookAuthenticationService {
  constructor (private readonly laodFacebookApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.laodFacebookApi.loadUser(params)
    return new AuthenticationError()
  }
}
