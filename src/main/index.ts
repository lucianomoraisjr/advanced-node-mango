import './config/module-alias'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { config } from '@/infra/postgres/helpers'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection(config)
  .then(() => app.listen(env.appPort, () => console.log(`Server running at http://localhost:${env.appPort}`)))
  .catch(console.error)
