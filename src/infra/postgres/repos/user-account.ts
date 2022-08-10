import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { getRepository } from 'typeorm'
import { PgUser } from '@/infra/postgres/entities'

type LoadParams = LoadUserAccount.Params
type LoadResult = LoadUserAccount.Result
type SaveParams = SaveFacebookAccount.Params
type SaveResult = SaveFacebookAccount.Result

export class PgUserAccountrepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser != null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFaceboook ({ email, name, facebookId, id }: SaveParams): Promise<SaveResult> {
    const pgUserRepo = getRepository(PgUser)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({
        email,
        name,
        facebookId
      })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({
        id: parseInt(id)
      }, {
        name,
        facebookId
      })
    }
    return { id: resultId }
  }
}
