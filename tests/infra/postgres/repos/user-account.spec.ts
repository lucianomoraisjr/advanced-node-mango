import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountrepository } from '@/infra/postgres/repos'
import { IBackup } from 'pg-mem'
import { getRepository, Repository, getConnection } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/postgres/mokcs'

describe('PgUerAccountRepository', () => {
  let sut: PgUserAccountrepository
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup
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

  describe('load', () => {
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
  describe('saveWithFaceboook', () => {
    it('should create an account if id is undefined', async () => {
      const { id } = await sut.saveWithFaceboook({
        email: 'any_email',
        name: 'any_email',
        facebookId: 'any_fb_id'
      })
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })
      expect(pgUser?.id).toBe(1)
      expect(id).toBe('1')
    })
    it('should create an account if id is undefined', async () => {
      await pgUserRepo.save({
        email: 'any_email',
        name: 'any_email',
        facebookId: 'any_fb_id'
      })
      const { id } = await sut.saveWithFaceboook({
        id: '1',
        email: 'any_email',
        name: 'any_email',
        facebookId: 'any_fb_id'
      })
      const pgUser = await pgUserRepo.findOne({ where: { id: '1' } })
      expect(pgUser).toEqual({
        id: 1,
        email: 'any_email',
        name: 'any_email',
        facebookId: 'any_fb_id'

      })
      expect(id).toBe('1')
    })
  })
})
