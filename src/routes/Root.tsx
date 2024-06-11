import { useEffect, useState } from 'react';
import CategoryList from '../components/domain/CategoryList/CategoryList';
import LayoutMain from '../layout/Main';

import { ICategoryListItem } from '../types/Category';
import { IArticleListItem } from '../types/Article';
import ArticleList from '../components/domain/ArticleList/ArticleList';
import Section from '../components/shared/Sections/Section/Section';
import { chunkArray } from '../shared/scripts/utils';
import { ScrollableListDirection } from '../components/shared/Lists/ScrollableList/ScrollableList';

export default function Root() {
  const [categories, updateCategories] = useState<ICategoryListItem[]>([]);
  const [articles, updateArticles] = useState<IArticleListItem[]>([]);
    
  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await fetch('/data/categories.json');

              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }

              const categoriesData = await response.json();
              updateCategories(categoriesData);
          } catch (error) {
              console.error(error);
          }
      };
  
      fetchCategories();    
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
        try {
            const response = await fetch('/data/articles.json');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const articlesData = await response.json();
            updateArticles(articlesData);
        } catch (error) {
            console.error(error);
        }
    };

    fetchArticles();
  }, []);

  const categoryList = categories && (<CategoryList categories={ categories }></CategoryList>);
  const articleLists = articles && (
    chunkArray(articles, 10).map((articlesChunk: IArticleListItem[], index: number) => {
      return (<ArticleList articles={articlesChunk} listDirection={index % 2 === 0 ? ScrollableListDirection.Left : ScrollableListDirection.Right}></ArticleList>)
    })
  );

  return (
    <LayoutMain>
      <article className="page page-home">
        <Section>
          <h1 className="section-title"> Home </h1>
          <p className="section-subtitle"> Select category from the list</p>
        </Section>
        <Section>
          <h2 className="section-title"> Categories </h2>
          <p className="section-subtitle"> Select category from the list</p>
          { categoryList }
        </Section>
        <Section>
          <h2 className="section-title"> Articles </h2>
          <p className="section-subtitle"> Select category from the list</p>
          { articleLists }
        </Section>
      </article>

      
    </LayoutMain>
  );
}