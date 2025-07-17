import { createResource, onMount } from "solid-js"
import { SolidMarkdown } from "solid-markdown"

export default function CompendiumPage() {

    const page = createResource( async () => {

        return await fetch('./compendium')

    })

    

    return (

        <SolidMarkdown />

    )
}