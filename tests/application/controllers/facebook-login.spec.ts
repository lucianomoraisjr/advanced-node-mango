import { FacebookAuthentication } from '@/domain/features'
import { mock, MockProxy } from 'jest-mock-extended'

class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    await this.facebookAuthentication.perform({ token: httpRequest.token })
    return {
      statusCode: 400,
      data: new Error('The field token is required')
    }
  }
}
type HttpResponse = {
  statusCode: number
  data: any

}
describe('FacebookLoginController', () => {
  let facebookAuth: MockProxy<FacebookAuthentication>
  let sut: FacebookLoginController
  beforeAll(() => {
    facebookAuth = mock()
  })
  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })
  it('should return 400 if emty', async () => {
    const httpResponse = await sut.handle({ token: '' })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
  it('should return 400 if null', async () => {
    const httpResponse = await sut.handle({ token: null })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
  it('should return 400 if undefined', async () => {
    const httpResponse = await sut.handle({ token: undefined })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
  it('should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token: 'any_token' })
    expect(facebookAuth.perform).toHaveBeenCalledWith({ token: 'any_token' })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })
  it('should return 401 if authentication fails', async () => {
    const httpResponse = await sut.handle({ token: '' })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
})
