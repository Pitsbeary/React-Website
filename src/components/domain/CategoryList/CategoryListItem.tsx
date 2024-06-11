import { ICategoryListItem } from "../../../types/Category";
import Pill from "../../shared/Buttons/Pill/Pill";

export default function CategoryListItem({ category } : { category: ICategoryListItem }) {
    return (
        <Pill>
            <a className="category-list-item" href={`/category/${category.slug}`}>{ category.title }</a>
        </Pill>
    );
}