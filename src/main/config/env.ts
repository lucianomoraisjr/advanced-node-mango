export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '457313296236175',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'a22deb77140bb9634159d93445fcfc73'
  },
  appPort: process.env.PORT ?? 3333,
  jwtSecret: process.env.JWT_SECRET ?? '21FD1F2DF'
}
