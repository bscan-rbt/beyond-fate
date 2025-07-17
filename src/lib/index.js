import { login, register, getSession, getUserbyID, logout } from './server'
import { action, query, redirect } from '@solidjs/router'
import { neon } from '@netlify/neon'
import * as fs from 'fs/promises'
import showdown from 'showdown'





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

export const LoadFiles = query(async (path) => {

    "use server"

    console.log("Loading files..")

    const directory = {}

    try {

        const files = await fs.readdir(path, { withFileTypes: true })

        for await (const file of files) {
            if (!file.name.startsWith('.')) {
                directory[file.name] = {}
                const subFolders = await fs.readdir(`${path}${file.name}`, { withFileTypes: true })
                for await (const f of subFolders) {
                    if (f.name != '.DS_Store') {
                        if (f.isDirectory()) {
                            directory[file.name][f.name] = {}
                            const nestedFolders = await fs.readdir(`${path}${file.name}/${f.name}`, { withFileTypes: true })
                            for await (const nf of nestedFolders) {
                                if (nf.name != '.DS_Store') {
                                    directory[file.name][f.name][nf.name] = `${path}${file.name}/${f.name}/${nf.name}`
                                }
                            }
                        } else {
                            directory[file.name][f.name] = `${path}${file.name}/${f.name}`
                        }


                    }
                }
            }

        }

        return directory


    } catch (error) {

        console.log(error.message)

    }


}, "load-files")

export const LoadArticle = query(async (path) => {

    "use server"

    const converter = new showdown.Converter()


    try {
        const article = await fs.readFile(path, 'utf-8')

        const articleHtml = converter.makeHtml(article)

        console.log("called")

        return articleHtml

    } catch (error) {

        console.error(error.message)

    }

}, "load-article")

export const Login = action(async (formData) => {

    "use server"

    const email = String(formData.get("email"))
    const password = String(formData.get("password"))


    try {

        const user = await login(email, password)
        const session = await getSession()

        await session.update((session) => {
            session.userId = user?.id
        })

        throw redirect('/', { status: 200 })

    } catch (error) {

        console.error(error.message)

        throw error

    }
}, "login-action")

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


