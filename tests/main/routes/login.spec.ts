import { PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mokcs'
import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'
import request from 'supertest'
import { UnauthorizedError } from '@/application/errors'

describe('Login Routes', () => {
  describe('POST /login/facebook', () => {
    const loadUserSpy = jest.fn()

    jest.mock('@/infra/gateways/facebook', () => {
      return {
        FacebookApi: jest.fn().mockReturnValue({
          loadUser: loadUserSpy
        })
      }
    })
    let backup: IBackup
    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
    })
    afterAll(async () => {
      await getConnection().close()
    })
    beforeEach(() => {
      backup.restore()
    })
    it('shold return 401 with UnauthorizedError', async () => {
      const { status, body } = await request(app)
        .post('/api/login/facebook')
        .send({ token: 'invalid_token' })

      expect(status).toBe(401)
      expect(body.error).toBe(new UnauthorizedError().message)
    })
  })
})
