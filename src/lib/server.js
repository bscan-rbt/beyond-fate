import { neon } from '@netlify/neon'
import * as bcrypt from 'bcrypt'
import { useSession } from 'vinxi/http'


export const login = async (email, password) => {
    const db = neon()

    const [result] = await db`SELECT * FROM auth."User" WHERE email = ${email}`

    if (result instanceof Error || !result) throw new Error("Invalid email / password combination.")


    if (result) {
        const match = await bcrypt.compare(password, result['password'])

        if (!match) throw new Error("Invalid email / password combination.")

    }

    return result
}

export const createSearchIndex = async (path) => {
    const fs = await import('fs/promises')
    const searchData = []
    let id = 1

    try {

        await fs.access(`${path}.search/searchdata.json`, fs.constants.F_OK)


    } catch (error) {

        const allFiles = await fs.readdir(path, { recursive: true, withFileTypes: true })

        const files = allFiles.filter((file) => {

            if (file.parentPath.includes('.obsidian') || file.parentPath.includes('.search') || file.name.startsWith('.')) {
                return false
            }

            return true

        })
        let id = 0
        const showdown = await import('showdown')
        const converter = new showdown.default.Converter()
        converter.setFlavor('github')

        /** Parse markdown file line by line, using #titles as indices for the search index. Takes one Dirent (fs/promises) as an argument. */
        const parseMD = async (file) => {

            const f = await fs.open(`${file.parentPath}/${file.name}`)

            const path = `${file.parentPath.slice(file.parentPath.indexOf('public'))}/${file.name}`

            let name = file.name.split('.')[0]
            let content = ''

            /* iterate through the lines, pushing at each new #title */
            for await (const line of f.readLines()) {
                if (line.startsWith('#')) {
                    if (content.length > 0) {
                        content = converter.makeHtml(content)
                        searchData.push({id, name, content, path})
                        id += 1
                        content = ''
                    }

                    name = line.slice(line.lastIndexOf('#') + 1).replace(/[^a-z 0-9]/ig, "")
                } else {
                    content = content.concat(line, " ")
                }
            }

            /* push any remaining content to the array */
            if (content.length > 0) {
                content = converter.makeHtml(content)
                searchData.push({id, name, content, path})
                id += 1
                content = ''
            }


        }

        for await (const file of files) {
            if (file.isFile() && !file.name.startsWith('.')) {
                await parseMD(file, searchData)
            }

        }

        fs.writeFile(`${path}/.search/searchdata.json`, JSON.stringify(searchData))

    }



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

    return useSession({
        password: import.meta.env.VITE_SESSION_SECRET
    })

}

export const logout = async () => {
    const session = await getSession()
    await session.update((session) => {
        session.userId = undefined
    })

}

export const getUserbyID = async (id) => {
    const db = neon()
    const [user] = await db`SELECT * FROM auth."User" WHERE id = ${id}`

    console.log(user.email)

    if (user instanceof Error || !user) throw new Error(`No user found matching ID: ${String(id)}`)

    return user

}







