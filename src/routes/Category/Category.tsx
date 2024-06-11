import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICategoryListItem } from "../../types/Category";
import LayoutMain from "../../layout/Main";
import { IArticleListItem } from "../../types/Article";
import ArticleList from "../../components/domain/ArticleList/ArticleList";

export default function Category() {    
    const { slug } = useParams();

    const [articles, updateArticles] = useState<IArticleListItem[]>([]);
    const [category, updateCategory] = useState<ICategoryListItem|null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch('/data/categories.json');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const categoriesData = await response.json();
                const category = categoriesData.find((category: ICategoryListItem) => {
                    return category.slug === slug;
                })

                updateCategory(category);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategory();
    }, [slug]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/data/articles.json');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const articlesData = await response.json();
                const articles = articlesData.filter((article: IArticleListItem) => {
                    return article.category === category?.title;
                });
                
                updateArticles(articles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticles();
    }, [category]);


    return category && (
        <LayoutMain>
            <article className="page page-category">
                <h1 className="page__title">{ category.title }</h1>
                <p className="page__subtitle">{ category.description }</p>

                <ArticleList articles={ articles }></ArticleList>
            </article>
        </LayoutMain>
    );
}