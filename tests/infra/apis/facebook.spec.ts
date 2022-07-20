import { FacebookApi } from '@/infra/apis/'
import { HttpGetClient } from '@/infra/http/'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookApi', () => {
  let clientId: string
  let clientSecret: string
  let sut: FacebookApi
  let hhtpClient: MockProxy<HttpGetClient>

  beforeAll(() => {
    clientId = 'any_cliente_id'
    clientSecret = 'any_client_secret'
    hhtpClient = mock()
  })
  beforeEach(() => {
    hhtpClient.get.mockResolvedValueOnce({ access_token: 'any_app_token' })
    sut = new FacebookApi(hhtpClient, clientId, clientSecret)
  })
  it('should get app token', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(hhtpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
  })
  it('should get debug token', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(hhtpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/debug_token',
      params: {
        access_token: 'any_app_token',
        input_token: 'any_client_token'
      }
    })
  })
})
