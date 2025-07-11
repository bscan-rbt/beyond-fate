import { useSession } from 'vinxi/http'
import * as db from './db'
import * as bcrypt from 'bcrypt'


export const login = async (email, password) => {

    const result = await db
        .select()
        .from('auth."User"')
        .where('email')
        .equals(email)
        .send()

    if (result instanceof Error || result.rows.length < 1) throw new Error("Invalid email / password combination.")

    if (result) {
        const match = await bcrypt.compare(password, result.rows[0]['password'])

        if (!match) throw new Error("Invalid email / password combination.")

    }

    return result.rows[0]
}

export const register = async (name, email, password) => {
    
    const result = await db
        .select()
        .from('auth."User"')
        .where('email')
        .equals(email)
        .send()

    if (result instanceof Error) throw new Error(result.message)

    if (result.rows.length > 0) throw new Error("A user with this email already exists!")

    const hash = await bcrypt.hash(password, 10)
    const user = await db
        .insert()
        .into('auth."User"', 'name', 'email', 'password')
        .values(name, email, hash)
        .returning('id', 'email')
        .send()

    if (user instanceof Error) throw new Error(user.message)

    return user.rows[0]
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

    const user = await db
    .select()
    .from('auth."User"')
    .where('id')
    .equals(id)
    .send()

    if(user instanceof Error || user.rows.length < 1) throw new Error(`No user found matching ID: ${String(id)}`)
    
    return user.rows[0]

}







