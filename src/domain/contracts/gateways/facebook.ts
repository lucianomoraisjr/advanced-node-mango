export interface LoadFacebookUser {
  loadUser: (params: LoadFacebookUser.Params) => Promise<LoadFacebookUser.Resut>
}

export namespace LoadFacebookUser {
  export type Params = {
    token: string
  }
  export type Resut = undefined | {
    name: string
    email: string
    facebookId: string
  }
}
