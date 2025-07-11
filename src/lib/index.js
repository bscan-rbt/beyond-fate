import { login, register, getSession, getUserbyID, logout } from './server'
import { action, query, redirect } from '@solidjs/router'

export const getUser = query( async () => {

    "use server"
    
    try {
        
        const session = await getSession()
        
        const userId = session.data.userId
        
        if(!userId) throw new Error("No user session found")

        const user = await getUserbyID(userId)

        return {id: user.id, email: user.email}
        
    } catch (error) {

        await logout()
        console.error(error.message)

    }

}, "user")


export const Register = action(async (formData) => {

    "use server"

    const name = String(formData.get("name"))
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    

    try {
        const user = await register(name, email, password)
           
        const session = await getSession()
        await session.update((session) => {
            session.userId = user?.id
        })

    } catch (error) {
       console.error(error.message)
       throw error

    }

    return redirect('/')

})

export const Login = action(async (formData) => {

    "use server"

    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    try {

        const user = await  login(email, password)

        const session = await getSession()
        await session.update((session) => {
            session.userId = user?.id
        })

    } catch (error) {
        
        throw error
        
    }

    return redirect('/')

})

export const Logout = action(async () => {

    "use server"

    await logout()
    throw redirect('/login')
})

export const getResource = query( async (id) => {



})


