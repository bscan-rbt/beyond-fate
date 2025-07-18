import { createAsync } from "@solidjs/router"
import { createSignal } from "solid-js"
import { Dynamic } from "solid-js/web"
import CompendiumArticle from "~/components/CompendiumArticle"
import TreeView from "~/components/TreeView"
import { useArticleContext } from "~/context/ArticleContext"
import { LoadFiles } from "~/lib"

export default function Compendium() {

    let open = true

    const folders = createAsync(() => LoadFiles('public/compendium/'))
    const [path, setPath] = useArticleContext()


    return (
        // <iframe src='./compendium/core-gameplay/summary.html' class='h-[90dvh] w-full' />

        <div class="flex h-full">
            <div id="drawer" class="w-1/4 h-[90dvh] transition-[width] duration-200 overscroll-auto  justify-center text-center sm:w-0 md:w-1/4 lg:w-1/4">
                <Show when={folders()}>
                    <TreeView folders={folders()} />
                </ Show>
            </div>
            <div class="grow h-[90dvh] overflow-scroll">
                <button  onClick={(e) => {
                    document.getElementById("drawer").style.width = open ? "0" : "25%"
                    open = !open
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width=".5"
                    stroke="#4691f6"
                    class="h-10 w-10 m-1 hover:stroke-accent"
                    
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d=  "M2.25,12.584c-0.713,0-1.292,0.578-1.292,1.291s0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291S2.963,12.584,2.25,12.584z M2.25,14.307c-0.238,0-0.43-0.193-0.43-0.432s0.192-0.432,0.43-0.432c0.238,0,0.431,0.193,0.431,0.432S2.488,14.307,2.25,14.307z M5.694,6.555H18.61c0.237,0,0.431-0.191,0.431-0.43s-0.193-0.431-0.431-0.431H5.694c-0.238,0-0.43,0.192-0.43,0.431S5.457,6.555,5.694,6.555z M2.25,8.708c-0.713,0-1.292,0.578-1.292,1.291c0,0.715,0.579,1.292,1.292,1.292c0.713,0,1.292-0.577,1.292-1.292C3.542,9.287,2.963,8.708,2.25,8.708z M2.25,10.43c-0.238,0-0.43-0.192-0.43-0.431c0-0.237,0.192-0.43,0.43-0.43c0.238,0,0.431,0.192,0.431,0.43C2.681,10.238,2.488,10.43,2.25,10.43z M18.61,9.57H5.694c-0.238,0-0.43,0.192-0.43,0.43c0,0.238,0.192,0.431,0.43,0.431H18.61c0.237,0,0.431-0.192,0.431-0.431C19.041,9.762,18.848,9.57,18.61,9.57z M18.61,13.443H5.694c-0.238,0-0.43,0.193-0.43,0.432s0.192,0.432,0.43,0.432H18.61c0.237,0,0.431-0.193,0.431-0.432S18.848,13.443,18.61,13.443z M2.25,4.833c-0.713,0-1.292,0.578-1.292,1.292c0,0.713,0.579,1.291,1.292,1.291c0.713,0,1.292-0.578,1.292-1.291C3.542,5.412,2.963,4.833,2.25,4.833z M2.25,6.555c-0.238,0-0.43-0.191-0.43-0.43s0.192-0.431,0.43-0.431c0.238,0,0.431,0.192,0.431,0.431S2.488,6.555,2.25,6.555z" />
                </svg>
                </button>

            <Dynamic component={CompendiumArticle} path={path()} />


        </div>

        </div >

    )
}