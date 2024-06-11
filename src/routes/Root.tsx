import { useEffect, useState } from 'react';
import CategoryList from '../components/domain/CategoryList/CategoryList';
import LayoutMain from '../layout/Main';
import { ICategoryListItem } from '../types/Category';

export default function Root() {
  const [categories, updateCategories] = useState<ICategoryListItem[]>([]);
    
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

  const categoryList = categories && (<CategoryList categories={ categories }></CategoryList>);

  return (
    <LayoutMain>
      <article className="page page-home">
          <h1 className="page__title"> Home </h1>
          <p className="page__subtitle"> Select category from the list</p>

          { categoryList }

          {/* Todo: Add article lists with articles split into categories */}
      </article>

      
    </LayoutMain>
  );
}