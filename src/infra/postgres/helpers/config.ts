import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '7455',
  database: 'AdvanceNode',
  synchronize: true,
  logging: true,
  entities: ['dist/infra/postgres/entities/index.js']

}
// host: 'localhost',
// port: 5432,
// username: 'postgres',
// password: '7455',
// database: 'AdvanceNode',
// entities: ['dist/infra/postgres/entities/index.js']
