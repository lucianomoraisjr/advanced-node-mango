import { Request, Response } from 'express'
import { Controller } from '@/application/controllers'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock } from 'jest-mock-extended'

class ExpressRouter {
  constructor (private readonly controller: Controller) {}
  async adapt (req: Request, res: Response): Promise<void> {
    await this.controller.handle({ ...req.body })
  }
}

describe('ExpressRouter', () => {
  let sut: ExpressRouter
  let controller: Controller
  beforeAll(() => {
    controller = mock<Controller>()
  })
  beforeEach(() => {
    sut = new ExpressRouter(controller)
  })
  it('shoud call handle with correct request', async () => {
    const req = getMockReq({ body: { any: 'any' } })
    const { res } = getMockRes()
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })
  it('shoud call handle with correct request', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
  })
})
