import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { TokenGenerator } from '@/data/contracts/crypto'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/models/facebook-account', () => {
  return {
    FacebookAccount: jest.fn().mockImplementation(() => {
      return {}
    })
  }
})

describe('FacebookAuthenticationService', () => {
  let sut: FacebookAuthenticationService
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>

  const token = 'any_token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      email: 'any_fb_email',
      name: 'any_fb_name',
      facebookId: 'any_fb_id'

    })
    userAccountRepo = mock()
    userAccountRepo.saveWithFaceboook.mockResolvedValueOnce({ id: 'any_account_id' })
    crypto = mock()
    sut = new FacebookAuthenticationService(facebookApi,
      userAccountRepo,
      crypto
    )
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookApi retunr  undefiened', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })
  it('should call Load UserAccountRepo when LoadFacebookUserApi', async () => {
    await sut.perform({ token })
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
  })
  it('should call SaveFacebookAccountRepository with FacebookAccount', async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined)
    await sut.perform({ token })
    expect(userAccountRepo.saveWithFaceboook).toHaveBeenCalledWith({ })
    expect(userAccountRepo.saveWithFaceboook).toHaveBeenCalledTimes(1)
  })

  it('should call TokenGenerator with correct params', async () => {
    await sut.perform({ token })
    expect(crypto.generateToken).toHaveBeenLastCalledWith({ key: 'any_account_id' })
  })
})
