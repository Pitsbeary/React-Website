import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICategoryItem } from "../../types/Category";
import LayoutMain from "../../layout/Main";
import { IArticleListItem, IArticleItem } from "../../types/Article";
import ArticleList from "../../components/domain/ArticleList/ArticleList";
import { getCategory } from "../../lib/wikipedia/api/categories";
import { getArticle, getArticlesFromCateogry } from "../../lib/wikipedia/api/articles";
import Section from "../../components/shared/Sections/Section/Section";


export default function Category() {    
    const { slug } = useParams();

    const [category, updateCategory] = useState<ICategoryItem|null>(null);

    const [categoryMainArticle, updateCategoryMainArticle] = useState<IArticleItem|null>(null);
    const [categoryArticles, updateCategoryArticles] = useState<IArticleListItem[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            if(!slug) {
                return;
            }

            try {
                const category: ICategoryItem | null = await getCategory(slug);
                console.log(category);
                updateCategory(category);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategory();
    }, [slug]);

    useEffect(() => {
        const fetchCategoryArticles = async () => {
            if(!slug || !category) {
                return;
            }

            try {
                const articles: IArticleListItem[] = await getArticlesFromCateogry(slug);
                updateCategoryArticles(articles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategoryArticles();
    }, [slug, category]);

    useEffect(() => {
        const fetchCategoryMainArticle = async () => {
            if(!categoryArticles) {
                return;
            }

            try {
                const article: IArticleItem | null = await getArticle(categoryArticles[0]?.title);
                updateCategoryMainArticle(article);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategoryMainArticle();
    }, [categoryArticles]);

    return category && (
        <LayoutMain>
            <article className="page page-category">
                { category && categoryMainArticle && (
                    <Section>
                        <h1 className="section__title">{ category.title }</h1>
                        <p className="section__subtitle">{ category.extract }</p>
                    </Section>        
                ) }

                { categoryArticles && (<Section>
                    <h2 className="section__title"> Articles </h2>
                    <p className="section__subtitle"> Select article from the list</p>

                    <ArticleList articles={ categoryArticles }></ArticleList>
                </Section>) }
                
            </article>
        </LayoutMain>
    );
}