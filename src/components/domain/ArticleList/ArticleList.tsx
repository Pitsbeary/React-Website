import { IArticleListItem } from "../../../types/Article";

import ArticleListItem from "./ArticleListItem";
import ScrollableList from "../../shared/Lists/ScrollableList/ScrollableList";

export default function ArticleList({ articles } : { articles: IArticleListItem[] }) {    
    return (
        <ScrollableList listItems={articles.map((article) => {
            return ( <ArticleListItem article={article}></ArticleListItem> );
        })}></ScrollableList>
    );
}