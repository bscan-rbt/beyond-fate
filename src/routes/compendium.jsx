import { createAsync } from "@solidjs/router"
import { Show } from "solid-js"
import { Dynamic } from "solid-js/web"
import CompendiumArticle from "~/components/compendium/CompendiumArticle"
import SearchBar from "~/components/compendium/SearchBar"
import TreeView from "~/components/compendium/TreeView"
import { HamburgerIcon } from "~/components/svgs/svgs"
import { useArticleContext } from "~/context/ArticleContext"
import { GetSearchData, LoadFiles } from "~/lib"

export const route = {
    preload: () => LoadFiles('public/compendium/')
}

export default function Compendium() {

    let open = true

    const folders = createAsync(() => LoadFiles('public/compendium/'))
    const data = createAsync(() => GetSearchData(), { deferStream: true })

    const [path, setPath] = useArticleContext()

    return (
        <div class="flex h-full">
            <div id="drawer" class="w-1/4 h-[90dvh] transition-[width, opacity]  duration-200 overscroll-auto  justify-center text-center sm:w-0 md:w-1/4 lg:w-1/4 bg-base-200 rounded-lg">

                <Show when={data()}><SearchBar data={data()} /></Show>
                <Show when={folders()}>
                    <TreeView folders={folders()} />
                </ Show>
            </div>
            <div class="grow h-[90dvh] overflow-scroll">
                <button onClick={(e) => {
                    document.getElementById("drawer").style.width = open ? "0" : "25%"
                    document.getElementById("drawer").style.opacity = open ? "0%" : "100%"
                    open = !open
                }}>
                    <HamburgerIcon />
                </button>
                <Dynamic component={CompendiumArticle} path={path()} />
            </div>
        </div >

    )
}