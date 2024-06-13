import { useEffect, useState } from 'react';
import CategoryList from '../components/domain/CategoryList/CategoryList';
import LayoutMain from '../layout/Main';

import { ICategoryListItem } from '../types/Category';
import { IArticleListItem } from '../types/Article';
import ArticleList from '../components/domain/ArticleList/ArticleList';
import Section from '../components/shared/Sections/Section/Section';
import { chunkArray } from '../shared/scripts/utils';
import { ScrollableListDirection } from '../components/shared/Lists/ScrollableList/ScrollableList';
import { getArticlesFromCateogry } from '../lib/wikipedia/api/articles';
import { getCategories } from '../lib/wikipedia/static/categories';

export default function Root() {
  const [categories, updateCategories] = useState<ICategoryListItem[]>([]);
  const [articles, updateArticles] = useState<IArticleListItem[]>([]);
    
  useEffect(() => {
      const fetchCategories = async () => {
          try {
            const categories: ICategoryListItem[] = await getCategories();
            updateCategories(categories);
          } catch (error) {
              console.error(error);
          }
      };
  
      fetchCategories();    
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
        const articlesTotal: IArticleListItem[] = [];
        
        try {
            for(const category of categories) {
              const articles = await getArticlesFromCateogry(category.title);
              articlesTotal.push(...articles);
            }
        } catch (error) {
            console.error(error);
        }

        updateArticles(articlesTotal);
    };

    fetchArticles();
  }, [categories]);

  return (
    <LayoutMain>
      <article className="page page-home">
        <Section>
          <h1 className="section__title"> Home </h1>
          <p className="section__subtitle"> Select category from the list</p>
        </Section>
        <Section>
          <h2 className="section__title"> Categories </h2>
          <p className="section__subtitle"> Select category from the list</p>
          { categories && (<CategoryList categories={ categories }></CategoryList>) }
        </Section>
        <Section>
          <h2 className="section__title"> Articles </h2>
          <p className="section__subtitle"> Select article from the list</p>
          { articles && (
            chunkArray(articles, 10).map((articlesChunk: IArticleListItem[], index: number) => {
              return (<ArticleList articles={articlesChunk} listDirection={index % 2 === 0 ? ScrollableListDirection.Left : ScrollableListDirection.Right}></ArticleList>)
            })
          ) }
        </Section>
      </article>

      
    </LayoutMain>
  );
}