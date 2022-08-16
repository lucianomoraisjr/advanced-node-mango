import { JwtTokenHandle } from '@/infra/gateways'

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
      await sut.generate({ key, expirationInMs })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
    })

    it('should return data on success', async () => {
      const token = await sut.generate({ key, expirationInMs })
      expect(token).toBe(token)
    })
    it('should rethrow if sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })
      const promise = sut.generate({ key, expirationInMs })
      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })
  describe('generateToken', () => {
    let token: string
    let key: string
    beforeAll(() => {
      key = 'any_key'
      token = 'token_any'
      fakeJwt.verify.mockImplementation(() => ({ key }))
    })
    it('should call sign with correct params', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
    })
    it('should rethrow the key used to sign', async () => {
      const generateToken = await sut.validate({ token })
      expect(generateToken).toBe(key)
    })
    it('should throw if verify throws', async () => {
      fakeJwt.verify.mockImplementationOnce(() => { throw new Error('key_error') })

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow(new Error('key_error'))
    })
    it('should throw if verify returns null', async () => {
      fakeJwt.verify.mockImplementationOnce(() => null)

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow()
    })
  })
})
