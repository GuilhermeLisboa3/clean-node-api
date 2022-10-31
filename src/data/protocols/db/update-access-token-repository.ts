
export interface UpdatedAccessTokenRepository {
  updateAccessToken: (id: string, token: string) => Promise<void>
}
