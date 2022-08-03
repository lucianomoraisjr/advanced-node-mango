import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'
describe('Facebook Api Integration Tests', () => {
  it('should return a Facebook User of token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'EAAGf7IySvo8BAFGQLcQVhZAWSly8BgTZAto3RosiwjlEHUQUPJkZBmprRBm6ilqhzf0ADRahq5yWOfK8AnrbZA8ZArfhwqOaJZAUsyHwsbBEo32zO032qEz1pWXxhsL2X8R1nsPPvcabC3UhcLEQX3TPxbRR06ZAc1LzYTDjfikbAPvyv7IsusdkVK8nneKpHZBD7MT6HdZBDk3svlOkovvVf' })
    expect(fbUser).toEqual({
      facebookId: '109548355186347',
      email: 'mango_fzgkqeh_teste@tfbnw.net',
      name: 'Mango teste'

    })
  })
  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'invalid' })
    expect(fbUser).toBeUndefined()
  })
})
