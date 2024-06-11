import { IArticleListItem } from "../../../types/Article";

import ArticleListItem from "./ArticleListItem";
import ScrollableList, { ScrollableListDirection } from "../../shared/Lists/ScrollableList/ScrollableList";

export default function ArticleList({ articles, listDirection = ScrollableListDirection.Left } : { articles: IArticleListItem[], listDirection?: ScrollableListDirection }) {    
    return (
        <div className='article-list'>
            <ScrollableList listItems={articles.map((article) => {
            return ( <ArticleListItem article={article}></ArticleListItem> );
            })} listDirection={listDirection}></ScrollableList>
        </div>
        
    );
}