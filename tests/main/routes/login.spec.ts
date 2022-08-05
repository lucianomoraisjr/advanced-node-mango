import { PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mokcs'
import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'
import request from 'supertest'

const FacebookApistub = jest.fn().mockImplementation(() => ({
  loadUser: jest.fn().mockResolvedValue({
    facebookId: 'any',
    name: 'any',
    email: 'any'
  })
}))
jest.mock('@/infra/apis', () => {
  return {
    FacebookApi: jest.fn().mockImplementation(FacebookApistub)
  }
})
describe('Login Routes', () => {
  describe('POST /login/facebook', () => {
    let backup: IBackup
    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
    })
    afterAll(async () => {
      await getConnection().close()
    })
    beforeEach(() => {
      FacebookApistub.mockClear()
      backup.restore()
    })
    it('shold return 200 with AccessToken', async () => {
      await request(app)
        .post('/api/login/facebook')
        .send({ token: 'valid_token' })
        .expect(200)
    })
  })
})
