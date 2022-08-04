import { Request, Response } from 'express'
import { Controller } from '@/application/controllers'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'

class ExpressRouter {
  constructor (private readonly controller: Controller) {}
  async adapt (req: Request, res: Response): Promise<void> {
    const httpResponse = await this.controller.handle({ ...req.body })
    res.status(200).json(httpResponse.data)
  }
}

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let sut: ExpressRouter
  let controller: MockProxy<Controller>
  beforeAll(() => {
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any_data' }
    })
  })
  beforeEach(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    sut = new ExpressRouter(controller)
  })
  it('shoud call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })
  it('shoud call handle with correct request', async () => {
    const req = getMockReq()
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
  })
  it('shoud respond with 200 and valid data', async () => {
    await sut.adapt(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' })
  })
})
