import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { FacebookAuthenticationUseCase } from '@/domain/use-cases'
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

describe('FacebookAuthenticationUseCase', () => {
  let sut: FacebookAuthenticationUseCase
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
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
    crypto.generateToken.mockResolvedValue('any_generated_token')
  })
  beforeEach(() => {
    sut = new FacebookAuthenticationUseCase(facebookApi,
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
    expect(crypto.generateToken).toHaveBeenLastCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
  })
  it('should return an AccessToken on success', async () => {
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AccessToken('any_generated_token'))
  })
  it('should rethrow if LoadFacebookApi throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))
    const promise = sut.perform({ token })
    await expect(promise).rejects.toThrow(new Error('fb_error'))
  })
  it('should rethrow if LoadUserAccountRepository  throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))
    const promise = sut.perform({ token })
    await expect(promise).rejects.toThrow(new Error('load_error'))
  })
  it('should rethrow if SaveFacebookAccountRepository  throws', async () => {
    userAccountRepo.saveWithFaceboook.mockRejectedValueOnce(new Error('save_error'))
    const promise = sut.perform({ token })
    await expect(promise).rejects.toThrow(new Error('save_error'))
  })
  it('should rethrow if TokenGeneratorthrows', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('token_error'))
    const promise = sut.perform({ token })
    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
