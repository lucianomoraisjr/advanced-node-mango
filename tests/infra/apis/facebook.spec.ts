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
})
