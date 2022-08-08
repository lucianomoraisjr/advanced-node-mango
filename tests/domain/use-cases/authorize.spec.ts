import { mock, MockProxy } from 'jest-mock-extended'
import { TokenValidator } from '../contracts/crypto'
import { Authorize, setupAuthorize } from '@/domain/use-cases'

describe('FacebookAuthentication', () => {
  let crypto: MockProxy<TokenValidator>
  let sut: Authorize
  let token: string
  beforeAll(() => {
    token = 'any_token'
    crypto = mock()
    crypto.validateToken.mockResolvedValue('any_value')
  })
  beforeEach(() => {
    sut = setupAuthorize(crypto)
  })

  it('should call TokenValidation with correct params', async () => {
    await sut({ token })
    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })
  it('should return token', async () => {
    const userId = await sut({ token })
    expect(userId).toBe('any_value')
  })
})
