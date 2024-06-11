import { IArticleListItem } from "../../../types/Article";
import Pill from "../../shared/Buttons/Pill/Pill";

export default function ArticleListItem({ article } : { article: IArticleListItem }) {
    return (
        <Pill>
            <a className="article-list-item" href={`/article/${article.slug}`}>{ article.title }</a>
        </Pill>
        
    );
}