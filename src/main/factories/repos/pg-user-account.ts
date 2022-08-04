
import { PgUserAccountrepository } from '@/infra/postgres/repos'

export const makePgUserAccountRepo = (): PgUserAccountrepository => {
  return new PgUserAccountrepository()
}
