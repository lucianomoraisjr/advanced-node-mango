import { NextFunction, Request, RequestHandler, Response } from 'express'
import { Controller } from '@/application/controllers'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'
import { adaptExpressRoute } from '@/infra/http'

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let sut: RequestHandler
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
    next = getMockRes().next
    sut = adaptExpressRoute(controller)
  })
  it('shoud call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })
  it('shoud call handle with correct request', async () => {
    const req = getMockReq()
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
  })
  it('shoud respond with 200 and valid data', async () => {
    await sut(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' })
  })
  it('shoud respond with 400 and valid error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any_error')
    })
    await sut(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
  })
  it('shoud respond with 500 and valid error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error')
    })
    await sut(req, res, next)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
  })
})
