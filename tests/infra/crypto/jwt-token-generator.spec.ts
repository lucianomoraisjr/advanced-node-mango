import { JwtTokenHandle } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenHandle', () => {
  let sut: JwtTokenHandle
  let expirationInMs: number
  let fakeJwt: jest.Mocked<typeof jwt>
  let secret: string
  beforeAll(() => {
    expirationInMs = 1000
    secret = 'any_secret'
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })
  beforeEach(() => {
    sut = new JwtTokenHandle(secret)
  })
  describe('generateToken', () => {
    let key: string
    let token: string
    beforeAll(() => {
      key = 'any_key'
      token = 'token_any'
      fakeJwt.sign.mockImplementation(() => token)
    })
    it('should call sign with correct params', async () => {
      await sut.generateToken({ key, expirationInMs })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
    })

    it('should return data on success', async () => {
      const token = await sut.generateToken({ key, expirationInMs })
      expect(token).toBe(token)
    })
    it('should rethrow if sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })
      const promise = sut.generateToken({ key, expirationInMs })
      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })
  describe('generateToken', () => {
    let token: string
    beforeAll(() => {
      token = 'token_any'
    })
    it('should call sign with correct params', async () => {
      await sut.validateToken({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
    })
  })
})
