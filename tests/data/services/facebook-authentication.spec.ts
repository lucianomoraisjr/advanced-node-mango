import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let sut: FacebookAuthenticationService
  let laodFacebookApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepo: LoadUserAccountRepository
  const token = 'any_token'

  beforeEach(() => {
    laodFacebookApi = mock()
    laodFacebookApi.loadUser.mockResolvedValue({
      name: 'any_name',
      email: 'any_email',
      facebookId: 'any_face'

    })
    loadUserAccountRepo = mock()

    sut = new FacebookAuthenticationService(laodFacebookApi, loadUserAccountRepo)
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })
    expect(laodFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(laodFacebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookApi retunr  undefiened', async () => {
    laodFacebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })
  it('should call Load UserAccountRepo when LoadFacebookUserApi ', async () => {
    await sut.perform({ token })
    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_email' })
  })
})
