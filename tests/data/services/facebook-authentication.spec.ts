import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly laodFacebookApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.laodFacebookApi.loadUser(params)
    return new AuthenticationError()
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result: undefined
  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Resut> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const laodFacebookApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(laodFacebookApi)
    await sut.perform({ token: 'any_token' })
    expect(laodFacebookApi.token).toBe('any_token')
  })

  it('should return AuthenticationError when LoadFacebookApi retunr  undefiened', async () => {
    const laodFacebookApi = new LoadFacebookUserApiSpy()
    laodFacebookApi.result = undefined
    const sut = new FacebookAuthenticationService(laodFacebookApi)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
