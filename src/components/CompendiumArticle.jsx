import '../styles/CompendiumArticle.css'

export default function CompendiumArticle(props){

    const article = props.article ? props.article : ""

    return (
        <div class="article">
            <div class="title">{article?.title}</div>
            <div class="body">{article?.body}</div>
            <div class="artwork"><image src={article?.artwork}/></div>
            <div class="artwork-text">{article?.artworkText}</div>
            <div class="article-footer">{article?.footer}</div>
        </div>
    )
}