import NextAuth from 'next-auth'

declare module "next-auth" {
    export interface Session {
        user: {
            _id: string,
            name: string,
            email: string,
            role: string,
            token: string
        }
    }
}