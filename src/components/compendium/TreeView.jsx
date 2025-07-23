import {  For } from "solid-js"
import { useArticleContext } from "~/context/ArticleContext"
import { FileIcon, FolderIcon } from "../svgs/svgs"

function File(props) {

    const [path, setPath] = useArticleContext()

    const handleClick = (e) => {
        e.preventDefault()
        setPath(props.path)

    }
    return (
        <li >
            <a  onClick={handleClick}>
                <FileIcon />
                {props.fileName.split('.')[0]}
            </ a>
        </li>
    )
}

function Folder(props) {
    return (<li>
        <details close>
            <summary>
                <FolderIcon />
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