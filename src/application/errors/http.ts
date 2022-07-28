export class ServerError extends Error {
  constructor (error?: Error | any) {
    super('Sever failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
