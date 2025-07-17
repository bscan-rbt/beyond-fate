import { createAsync } from '@solidjs/router'
import { Show } from 'solid-js'
import { useArticleContext } from '~/context/ArticleContext'
import { LoadArticle } from '~/lib'


export default function CompendiumArticle(props) {

    const [path, setPath] = useArticleContext()

    const article = createAsync(() => LoadArticle(path()))

    return (
        <Show when={article()}>
            <div class=
            "prose prose-headings:text-blue-400 lg:prose-lg sm:prose-sm prose-headings:font-semibold prose-strong:text-orange-300 prose-em:text-red-400 lg:prose-headings:text-4xl sm:prose-headings:text-xl w-full h-screen mx-auto " 
            innerHTML={article()} />

        </ Show>
    )





}