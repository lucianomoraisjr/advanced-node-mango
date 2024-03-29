import axios from 'axios'
import { HttpGetClient } from '@/infra/gateways'

export class AxiosHttpClient {
  async get ({ params, url }: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
