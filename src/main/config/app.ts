import express from 'express'
import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoute } from '@/main/config/routes'
const app = express()
setupMiddlewares(app)
setupRoute(app)
export { app }
