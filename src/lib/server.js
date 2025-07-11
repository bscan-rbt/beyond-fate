import { useSession } from 'vinxi/http'
import { neon } from '@netlify/neon'
import * as bcrypt from 'bcrypt'


export const login = async (email, password) => {
    const db = neon()

    const result = await db`SELECT * FROM auth."User" WHERE email = ${email}`

    if (result instanceof Error || !result) throw new Error("Invalid email / password combination.")

    if (result) {
        const match = await bcrypt.compare(password, result[0]['password'])

        if (!match) throw new Error("Invalid email / password combination.")

    }

    return result[0]
}

export const register = async (name, email, password) => {

    const db = neon()
    
    const result = await db`SELECT * FROM auth."User" WHERE email = ${email}`

    if (result instanceof Error) throw new Error(result.message)

    if (!result) throw new Error("A user with this email already exists!")

    const hash = await bcrypt.hash(password, 10)
    const user = await db`INSERT INTO auth."User" VALUES (${name}, ${email}, ${hash}) RETURNING id, email`
        
    if (user instanceof Error) throw new Error(user.message)

    return user[0]
}

export const getSession = async () => {
    
    const session = await useSession({
        password: import.meta.env.VITE_SESSION_SECRET
    })

    return session
}

export const logout = async () => {
    const session = await getSession()
    session.data.userId = undefined
}

export const getUserbyID = async (id) => {
    const db = neon()
    const user = await db`SELECT * FROM auth."User" WHERE id = ${id}`

    if(user instanceof Error || !user) throw new Error(`No user found matching ID: ${String(id)}`)
    
    return user[0]

}







