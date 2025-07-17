import { createContext, useContext } from "solid-js";

const ArticleContext = createContext()

export default ArticleContext

export function useArticleContext() {
    const article = useContext(ArticleContext)

    return article
}