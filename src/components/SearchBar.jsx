import { createAsync } from "@solidjs/router"
import { GetSearchData } from "~/lib"
import { createSignal, For, onMount, Show, Suspense } from "solid-js"
import MiniSearch from "minisearch"
import { useArticleContext } from "~/context/ArticleContext"



export default function SearchBar(props) {

    const search = new MiniSearch({ fields: ['name', 'content'], storeFields: ['name', 'content', 'path'] })
    search.addAll(props.data)

    const [results, setResults] = createSignal([])
    const [snippet, setSnippet] = createSignal('')
    const [path, setPath] = useArticleContext()


    const handleInput = (e) => {

        const res = search.search(e.currentTarget.value, { prefix: true })
        setResults(res.slice(0, 10))

    }

    const handleResultClick = (result) => {
        setPath(result.path)
        document.getElementById("search-bar").value = ''
        setResults([])
        

    }

    const handleResultMouseover = (e) => {
        const link = e.currentTarget.children.item(0)
        link.hidden = false

        e.currentTarget.onmouseleave = () => {
            link.hidden = true
        }
    }

    const getTextSnippet = (result, length) => {

        return result.content.substring(0,  length > result.content.length ? result.content.length : length) + '...'
    }

    return (
        <Suspense>
            <label class="input input-sm w-[90%] mt-2">
                {console.log(results())}

                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input id="search-bar" type="search" required placeholder="Search" onInput={(e) => handleInput(e)} />
            </label>
            <ul class="absolute menu menu-lg dropdown-content bg-base-100 rounded-box z-1 w-72 ml-5 p-2 shadow-sm" hidden={results() < 1}>
                <For each={results()}>
                    {(result) => 
                        <li class="relative hover:bg-accent-content hover:cursor-pointer" onMouseOver={handleResultMouseover} onClick={() => handleResultClick(result)}>
                        {result.name}
                        <div name="hover" class="absolute bg-base-300 z-30 left-52 w-3xl pl-[20%] prose prose-strong:text-orange-300 prose-em:text-red-400" hidden innerHTML={getTextSnippet(result, 800)} />
                    </li>
                    }
                </For>
            </ul>

        </Suspense>
    )
}