import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {getAPIToken} from "../../../lib/polls";

const providers = [
    Providers.Credentials({
        name: 'Email',
        credentials: {
            email: {label: "Email", type: "email", placeholder: "email@example.com"},
            password: {label: "Password", type: "password", placeholder: "password"}
        },
        async authorize(credentials, req) {
            try {
                const data = {email: credentials.email, password: credentials.password}
                const user = await getAPIToken(data)
                if (user) {
                    return {status: 'success', data: user}
                }
            } catch (error) {
                return null
            }
        }
    })
]

const callbacks = {
    async jwt(token, user) {
        if (user) {
            token.accessToken = user.data.token
            token.user = user.data.user
        }

        return token
    },

    async session(session, token, user) {
        session.accessToken = token.accessToken
        session.user = token.user
        return session
    }
}

const options = {
    providers,
    callbacks
}

export default (req, res) => NextAuth(req, res, options)