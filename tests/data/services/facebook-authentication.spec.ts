import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const laodFacebookApi = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(laodFacebookApi)
    await sut.perform({ token: 'any_token' })
    expect(laodFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(laodFacebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookApi retunr  undefiened', async () => {
    const laodFacebookApi = {
      loadUser: jest.fn()
    }
    laodFacebookApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(laodFacebookApi)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
