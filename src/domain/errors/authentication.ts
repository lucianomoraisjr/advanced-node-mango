export class AuthenticationError extends Error {
  constructor () {
    super('Authentication falied')
    this.name = 'AuthenticationError'
  }
}
