import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountrepository } from '@/infra/postgres/repos'
import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/postgres/mokcs'

describe('PgUerAccountRepository', () => {
  let sut: PgUserAccountrepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup
  describe('load', () => {
    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })
    afterAll(async () => {
      await getConnection().close()
    })
    beforeEach(() => {
      backup.restore()
      sut = new PgUserAccountrepository()
    })

    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account).toEqual({ id: '1' })
    })
    it('should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })
})
