export interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Resut>
}

export namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
  export type Resut = undefined
}
