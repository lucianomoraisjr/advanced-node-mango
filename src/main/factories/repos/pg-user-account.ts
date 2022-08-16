
import { PgUserAccountrepository } from '@/infra/repos/postgres'

export const makePgUserAccountRepo = (): PgUserAccountrepository => {
  return new PgUserAccountrepository()
}
