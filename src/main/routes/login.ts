import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeFacebookLoginController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/login/facebook', adapt(makeFacebookLoginController()))
}
