
export interface Decrypter {
  decrypt: (iphertext: string) => Promise<string>
}
