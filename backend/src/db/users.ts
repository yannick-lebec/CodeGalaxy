export interface User {
  id: string
  email: string
  passwordHash: string
}

export const users: User[] = []