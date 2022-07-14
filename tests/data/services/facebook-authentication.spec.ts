import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly laodFacebookApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.laodFacebookApi.loadUser(params)
  }
}
interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}
class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const laodFacebookApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(laodFacebookApi)
    await sut.perform({ token: 'any_token' })
    expect(laodFacebookApi.token).toBe('any_token')
  })
})
