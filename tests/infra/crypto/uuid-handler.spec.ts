import { UUIDHandler } from '@/infra/crypto'
import * as uuidV4 from 'uuid'

jest.mock('uuid')
describe('UUIDHandler', () => {
  let sut: UUIDHandler

  beforeEach(() => {
    sut = new UUIDHandler()
  })

  it('should return correct uuid', () => {
    const uuidSpy = jest.spyOn(uuidV4, 'v4').mockReturnValue('any_uuid')
    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_any_uuid')
    expect(uuidSpy).toHaveBeenCalledTimes(1)
  })
})
