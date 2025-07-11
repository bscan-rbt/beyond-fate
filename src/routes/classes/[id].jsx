import { createAsync, query, useParams } from "@solidjs/router";
import { Suspense } from "solid-js";
import CompendiumArticle from "~/components/CompendiumArticle";
import * as db from './../../lib/db.js'

export const route = {
    preload: () => getResource()
}

const getPlayerClassByID = query(async (id) => {
    "use server"

    try {
        const playerClass = await db
            .select()
            .from("Player_Class")
            .where("id")
            .equals(id)
            .send()
        if (playerClass instanceof Error) throw playerClass
        if (playerClass.rows.length < 1) throw new Error(`No classes found matching the ID: ${id}`)
        
        return playerClass

    } catch (error) {
        return error

    }

})

export default function PlayerClass() {

    const params = useParams()
    const playerClass = createAsync(() => getPlayerClassByID(params.id))

    return (
        <Suspense><CompendiumArticle article={playerClass()} /></Suspense>
    )
}