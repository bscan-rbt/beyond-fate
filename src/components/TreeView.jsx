import { createEffect, For } from "solid-js"
import { useArticleContext } from "~/context/ArticleContext"

function File(props) {

    const [path, setPath] = useArticleContext()

    const handleClick = (e) => {
        e.preventDefault()
        setPath(props.path)

    }
    return (
        <li >
            <a  onClick={handleClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                {props.fileName.split('.')[0]}
            </ a>
        </li>
    )
}

function Folder(props) {
    return (<li>
        <details close>
            <summary>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-4 w-4">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                {props.name}
            </summary>
            <ul>
                <For each={Object.entries(props.folder)}>{
                    ([key, value]) => {
                        if(value instanceof Object){
                            return <Folder name={key} folder={value}/>
                        } else {
                            return <File fileName={key} path={value} />
                        }
                    }}</For>
            </ul>
        </details>
    </li>)
}


export default function TreeView(props) {

    return (
        <ul class="menu menu-md flex-nowrap bg-scroll bg-base-200 rounded-box max-w-xs w-full h-full overflow-scroll">
            <For each={Object.entries(props.folders)}>{([key, value]) => {
                return <Folder name={key} folder={value} />
            }
            }</For>
        </ul>
    )
}