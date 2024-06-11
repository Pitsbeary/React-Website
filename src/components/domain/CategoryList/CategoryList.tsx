import { ICategoryListItem } from "../../../types/Category";
import ScrollableList from "../../shared/Lists/ScrollableList/ScrollableList";

import CategoryListItem from "./CategoryListItem";

export default function CategoryList({ categories } : { categories: ICategoryListItem[] }) {
    
    return (
        <ScrollableList listItems={categories.map((category, index) => {
            return ( <CategoryListItem key={index} category={category}/> );
        })}></ScrollableList>
    );        
    
}