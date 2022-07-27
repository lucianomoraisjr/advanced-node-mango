import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { newDb } from 'pg-mem'
import { Column, Entity, PrimaryGeneratedColumn, getRepository } from 'typeorm'
class PgUserAccountrepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser != null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }
}

@Entity({ name: 'usuarios' })
class PgUser {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ name: 'nome', nullable: true })
    name?: string

  @Column()
    email!: string

  @Column({ name: 'id_facebook', nullable: true })
    facabookId?: number
}
describe('PgUerAccountRepository', () => {
  describe('load', () => {
    it('should return an account if email exists', async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })

      await connection.synchronize()
      const pgUserRepo = getRepository(PgUser)
      await pgUserRepo.save({ email: 'existing_email' })
      const sut = new PgUserAccountrepository()
      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
      await connection.close()
    })
    it('should return undefined if email does not exists', async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })

      await connection.synchronize()
      const sut = new PgUserAccountrepository()
      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
      await connection.close()
    })
  })
})