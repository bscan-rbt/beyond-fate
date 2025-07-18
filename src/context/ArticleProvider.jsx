import { createAsync } from "@solidjs/router";
import ArticleContext from "./ArticleContext";
import { getUser } from "~/lib";
import { createSignal } from "solid-js";


export default function ArticleProvider(props) {

    const [path, setPath] = createSignal('./public/compendium/Core Gameplay/summary.md')

    return (
        <ArticleContext.Provider value={[path, setPath]}>{props.children}</ArticleContext.Provider>
    )

}