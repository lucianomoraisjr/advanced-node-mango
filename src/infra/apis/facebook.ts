import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { HttpGetClient } from '../http'

type AppToken = {
  access_token: string
}

type DebugToken = {
  data: {
    user_id: string
  }
}
type UserInfo = {
  id: string
  name: string
  email: string
}
export class FacebookApi implements LoadFacebookUserApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor (
    private readonly httpClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Resut> {
    return await this.getUserInfo(params.token)
      .then(({ id, name, email }) => ({
        facebookId: id,
        name,
        email
      }))
      .catch(() => undefined)
  }

  private async getAppToken (): Promise<AppToken> {
    return await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })
  }

  private async getDebugToken (client: string): Promise<DebugToken> {
    const appToken = await this.getAppToken()
    return await this.httpClient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken.access_token,
        input_token: client
      }
    })
  }

  private async getUserInfo (client: string): Promise<UserInfo> {
    const debugToken = await this.getDebugToken(client)
    return await this.httpClient.get({
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: client
      }
    })
  }
}
