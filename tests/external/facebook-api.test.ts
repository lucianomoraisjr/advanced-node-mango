import { FacebookApi, AxiosHttpClient } from '@/infra/gateways'
import { env } from '@/main/config/env'
describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi
  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })
  it('should return a Facebook User of token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAGf7IySvo8BAL6lvVPt8uXwXrMwwGVUZBvJ0NQET9QW9UKJwP2SZCyzKKHOh1GZCWCNK9YxlggAo23X4g1eiDW8aW1SoFHk1kc9U8v2P2SPW1jOIn86kWX8KKYNFKO94EpsWLUDq7RGiYmgOfi4UhI1RHyJtI3I67MiiXaM77RuvnnAy3SaLA4G7hMdGZCoZCWS9HJwt4gZDZD' })
    expect(fbUser).toEqual({
      facebookId: '109548355186347',
      email: 'mango_fzgkqeh_teste@tfbnw.net',
      name: 'Mango teste'

    })
  })
  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })
    expect(fbUser).toBeUndefined()
  })
})
