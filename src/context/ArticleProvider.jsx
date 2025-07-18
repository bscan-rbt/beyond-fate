import { createSignal } from "solid-js";
import ArticleContext from "./ArticleContext";


export default function ArticleProvider(props) {

    const [path, setPath] = createSignal('public/compendium/Core Gameplay/Summary.md')

    return (
        <ArticleContext.Provider value={[path, setPath]}>{props.children}</ArticleContext.Provider>
    )

}