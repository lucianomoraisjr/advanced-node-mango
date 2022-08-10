import { LoadFacebookUser, TokenGenerator } from '@/domain/contracts/gateways'
import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'
import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken } from '@/domain/entities'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/entities/facebook-account', () => {
  return {
    FacebookAccount: jest.fn().mockImplementation(() => {
      return {}
    })
  }
})

describe('FacebookAuthentication', () => {
  let sut: FacebookAuthentication
  let facebookApi: MockProxy<LoadFacebookUser>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccount & SaveFacebookAccount>
  let token: string
  beforeAll(() => {
    token = 'any_token'
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      email: 'any_fb_email',
      name: 'any_fb_name',
      facebookId: 'any_fb_id'

    })
    userAccountRepo = mock()
    userAccountRepo.saveWithFaceboook.mockResolvedValue({ id: 'any_account_id' })
    crypto = mock()
    crypto.generate.mockResolvedValue('any_generated_token')
  })
  beforeEach(() => {
    sut = setupFacebookAuthentication(facebookApi,
      userAccountRepo,
      crypto
    )
  })

  it('should call LoadFacebookUser with correct params', async () => {
    await sut({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookApi retunr  undefiened', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })
  it('should call Load UserAccountRepo when LoadFacebookUser', async () => {
    await sut({ token })
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
  })
  it('should call SaveFacebookAccount with FacebookAccount', async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined)
    await sut({ token })
    expect(userAccountRepo.saveWithFaceboook).toHaveBeenCalledWith({ })
    expect(userAccountRepo.saveWithFaceboook).toHaveBeenCalledTimes(1)
  })

  it('should call TokenGenerator with correct params', async () => {
    await sut({ token })
    expect(crypto.generate).toHaveBeenLastCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
  })
  it('should return an AccessToken on success', async () => {
    const authResult = await sut({ token })
    expect(authResult).toEqual(new AccessToken('any_generated_token'))
  })
  it('should rethrow if LoadFacebookApi throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))
    const promise = sut({ token })
    await expect(promise).rejects.toThrow(new Error('fb_error'))
  })
  it('should rethrow if LoadUserAccount  throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))
    const promise = sut({ token })
    await expect(promise).rejects.toThrow(new Error('load_error'))
  })
  it('should rethrow if SaveFacebookAccount  throws', async () => {
    userAccountRepo.saveWithFaceboook.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut({ token })
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })
  it('should rethrow if TokenGeneratorthrows', async () => {
    crypto.generate.mockRejectedValueOnce(new Error('token_error'))
    const promise = sut({ token })
    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
