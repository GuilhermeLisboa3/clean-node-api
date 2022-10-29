
export interface UpdatedAccessTokenRepository {
  update: (id: string, token: string) => Promise<void>
}
