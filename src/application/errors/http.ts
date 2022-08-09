export class ServerError extends Error {
  constructor (error?: Error | any) {
    super('Sever failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
export class RequiredFieldError extends Error {
  constructor (fildeName: string) {
    super(`The field ${fildeName} is required`)
    this.name = 'RequiredFieldError'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}
export class ForbiddenError extends Error {
  constructor () {
    super('Acess denied')
    this.name = 'ForbiddenError'
  }
}
