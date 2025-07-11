import format from "pg-format"
import { Pool } from "pg"
import * as db from './index.js'

const pool = new Pool({
    port: import.meta.env.VITE_DB_PORT,
    user: import.meta.env.VITE_DB_USER,
    password: import.meta.env.VITE_DB_PASSWORD,
    host: import.meta.env.VITE_DB_HOST,
    database: import.meta.env.VITE_DB_NAME
})

let query = ''

const send = async () => await pool.query(query, [])

const get = () => {
    return query

}

export const update = (table) => {
    query = format('UPDATE %s ', table)

    return { set }
}

export const insert = (...rows) => {

    if (rows.length > 0) {
        query = format(`INSERT %s `, rows)
    } else {
        query = 'INSERT '
    }

    return { into }
}

export const select = (...columns) => {

    if (columns.length > 0) {
        query = format(`SELECT %L `, columns)
    } else {
        query = 'SELECT * '
    }

    return { from }

}

const returning = (...columns) => {
    query = query.concat(format('RETURNING %s ', columns))

    return {send}
}
const transact = (queue) => {
    transaction(queue)
}

const from = (table) => {

    query = query.concat(`FROM ${table} `)

    return { where, send }

}

const where = (column) => {

    if (column) {
        query = query.concat(format('WHERE %s ', column))
    } else {
        query = query.concat('WHERE ')
    }


    return { send, get, not, like, equals }
}

const innerJoin = (table, column1, column2) => {

    query = query.concat(format('INNER JOIN %s ON %I = %I', table, column1, column2))

    return { send, get }
}


const into = (tableName, ...columns) => {

    if (columns.length > 0) {
        query = query.concat(format('INTO %s(%s) ', tableName, columns))
    } else {
        query = query.concat(format('INTO %s ', tableName))
    }

    return { values }

}

const values = (...values) => {
    query = query.concat(format('VALUES(%L) ', values))
    return { send, get, returning }
}



const set = (columns, values) => {

    query = query.concat(format('SET '))

    columns.forEach((column, index) => {

        const formatType = typeof values[index] === "string" ? "%L" : "%s"

        if (index + 1 === columns.length) {
            query = query.concat(format(`%I = ${formatType} `, column, values[index]))

        } else {

            query = query.concat(format(`%I = ${formatType} , `, column, values[index]))

        }
    });

    return { where }

}

const and = (column) => {
    query = query.concat(format('AND %I ', column))

    return { and, like, or }
}

const or = (column) => {
    query = query.concat(format('OR %I ', column))

    return { and, like, or }
}

const not = () => {
    query = query.concat('NOT ')

    return { like, equals, greaterThan, lessThan }
}

const like = (value) => {

    query = query.concat('LIKE %L ', value)

    return { send }
}

const equals = (value) => {

    query = query.concat(format('= %L ', value))
    return { send }
}

const lessThan = (value) => {

    query = query.concat(format('< %L ', value))
    return { send }
}

const greaterThan = (value) => {

    query = query.concat(format('> %L ', value))
    return { send }
}


const transaction = async (queries) => {

    const client = await db.pool.connect()

    let result, error

    try {

        await client.query('BEGIN')

        queries.forEach(async (query) => {

            await client.query(query, [])

        })

        await client.query('COMMIT')

        result = true

        return { result, error }

    } catch (err) {

        await client.query('ROLLBACK')
        error = err

        return { result, error }

    } finally {
        client.release()
    }

}












