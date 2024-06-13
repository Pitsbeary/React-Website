import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArticleItem } from "../../types/Article";
import LayoutMain from "../../layout/Main";
import { getArticle } from "../../lib/wikipedia/api/articles";
import Section from "../../components/shared/Sections/Section/Section";

export default function Article() {    
    const { slug } = useParams();

    const [article, updateArticle] = useState<IArticleItem|null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if(!slug) {
                    return;
                }
    
                try {
                    const article: IArticleItem | null = await getArticle(slug);
                    updateArticle(article);
                } catch (error) {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();
    }, [slug]);

    return article && (
        <LayoutMain>
            <article className="page page-article">
                { article && (
                    <Section>
                        <h1 className="section__title">{ article.title }</h1>
                        <p className="section__subtitle">{ article.extract }</p>
                    </Section>        
                ) }
            </article>
        </LayoutMain>
    );
}