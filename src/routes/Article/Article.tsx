import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArticleListItem } from "../../types/Article";
import LayoutMain from "../../layout/Main";

export default function Article() {    
    const { slug } = useParams();

    const [article, updateArticle] = useState<IArticleListItem|null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch('/data/articles.json');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const articles: IArticleListItem[] = await response.json();

                const article = articles.find((article) => {
                    return article.slug === slug;
                });

                updateArticle(article ? article : null);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();
    }, [slug]);

    return article && (
        <LayoutMain>
            <article className="page page-article">
                <h1 className="page__title">{ article.title }</h1>
                <p className="page__subtitle">{ article.description }</p>
            </article>
        </LayoutMain>
    );
}