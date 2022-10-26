export interface LogErrorRepository {
  log: (accountData: string) => Promise<void>
}
