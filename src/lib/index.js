import { login, register, getSession, getUserbyID, logout } from './server'
import { action, query, redirect } from '@solidjs/router'
import { neon } from '@netlify/neon'



export const getUser = query(async () => {

    "use server"

    try {

        const session = await getSession()

        const userId = session.data.userId

        if (!userId) throw new Error("No user session found")

        const user = await getUserbyID(userId)

        return { id: user.id, email: user.email }

    } catch (error) {

        // await logout()
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

        return redirect('/')

    } catch (error) {
        console.error(error.message)
        throw error

    }



})

export const Login = action(async () => {

    "use server"

    return {nothing}

    // const email = String(formData.get("email"))
    // const password = String(formData.get("password"))

    // try {

    //     const user = await login(email, password)

    //     console.log(email)

    //     const session = await getSession()
    //     await session.update((session) => {
    //         session.userId = user?.id
    //     })

    //     return redirect('/')

    // } catch (error) {

    //     return error

    // }



}, "login")

export const Logout = action(async () => {

    "use server"

    console.log(getUser.key)

    await logout()
    return redirect('/login', { revalidate: getUser.key })
})

export const uploadDeck = action(async (name, desc, cards) => {

    "use server"

    try {

        const session = await getSession()

        const userId = session.data.userId

        console.log(`USER: ${userId}`)

        if (!userId) throw new Error("User must be logged in to save a deck.")

        const db = neon()
        const queries = []

        const [deckId] = await db`INSERT INTO public."Deck"(name, user_id, description) VALUES(${name}, ${userId}, ${desc}) RETURNING id`


        if (!deckId) throw new Error("Failed to insert new deck!")

        cards.forEach((card) => {

            queries.push(
                db`WITH cid as (INSERT INTO public."Card"(name, fate, description, damage_die, ap_cost, img_url) VALUES(${card.title}, ${card.origins}, ${card.desc}, ${card.damage.dice}, ${card.apCost}, ${card.artwork}) RETURNING id) INSERT INTO public."Deck_Cards"(deck_id, card_id) VALUES(${deckId.id}, (SELECT id FROM cid))`)

        })

        const result = await db.transaction(queries, { fullResults: true })




    } catch (error) {

        console.log(error.message)

    }

})


