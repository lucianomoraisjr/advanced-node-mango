
class FacebookLoginController {
  async handle (httpRequest: any): Promise<HttoResponse> {
    return {
      statusCode: 400,
      data: new Error('The field token is required')
    }
  }
}
type HttoResponse = {
  statusCode: number
  data: any

}
describe('FacebookLoginController', () => {
  it('should return 400 if emty', async () => {
    const sut = new FacebookLoginController()
    const httoResponse = await sut.handle({ token: '' })
    expect(httoResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
  it('should return 400 if null', async () => {
    const sut = new FacebookLoginController()
    const httoResponse = await sut.handle({ token: null })
    expect(httoResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
  it('should return 400 if undefined', async () => {
    const sut = new FacebookLoginController()
    const httoResponse = await sut.handle({ token: undefined })
    expect(httoResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
})
