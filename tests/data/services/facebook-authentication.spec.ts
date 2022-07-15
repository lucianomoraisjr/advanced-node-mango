import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: FacebookAuthenticationService
  laodFacebookApi: MockProxy<LoadFacebookUserApi>
}
const makeSut = (): SutTypes => {
  const laodFacebookApi = mock<LoadFacebookUserApi>()
  const sut = new FacebookAuthenticationService(laodFacebookApi)
  return {
    sut,
    laodFacebookApi
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const { laodFacebookApi, sut } = makeSut()
    await sut.perform({ token: 'any_token' })
    expect(laodFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(laodFacebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookApi retunr  undefiened', async () => {
    const { laodFacebookApi, sut } = makeSut()
    laodFacebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
