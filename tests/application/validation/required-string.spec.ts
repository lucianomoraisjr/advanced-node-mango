import { RequiredFieldError } from '@/application/errors'

class RequiredStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  valide (): Error | undefined {
    return new RequiredFieldError('any_field')
  }
}

describe('RequiredStringValidator', () => {
  it('should return Error if value is empty', () => {
    const sut = new RequiredStringValidator('', 'any_field')
    const error = sut.valide()
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
  it('should return Error if value null', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field')
    const error = sut.valide()
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
  it('should return Error if value is undefined', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any_field')
    const error = sut.valide()
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
})
