import { ICategoryListItem } from "../../../types/Category";
import ScrollableList, { ScrollableListDirection } from "../../shared/Lists/ScrollableList/ScrollableList";

import CategoryListItem from "./CategoryListItem";

export default function CategoryList({ categories, listDirection = ScrollableListDirection.Left } : { categories: ICategoryListItem[], listDirection?: ScrollableListDirection }) {
    
    return (
        <ScrollableList listItems={categories.map((category, index) => {
            return ( <CategoryListItem key={index} category={category}/> );
        })} listDirection={listDirection}></ScrollableList>
    );        
    
}