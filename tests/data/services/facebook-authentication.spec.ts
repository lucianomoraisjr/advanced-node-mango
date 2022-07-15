import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let sut: FacebookAuthenticationService
  let laodFacebookApi: MockProxy<LoadFacebookUserApi>

  beforeEach(() => {
    laodFacebookApi = mock()
    sut = new FacebookAuthenticationService(laodFacebookApi)
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token: 'any_token' })
    expect(laodFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(laodFacebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookApi retunr  undefiened', async () => {
    laodFacebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
