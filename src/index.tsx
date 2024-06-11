import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import './routes/Article/Article.scss';

import './components/shared/Buttons/Pill/Pill.scss';

import './components/shared/Lists/ScrollableList/ScrollableList.scss';
import './components/shared/Lists/ScrollableList/ScrollableListItem.scss';

import './components/domain/CategoryList/CategoryList.scss';
import './components/domain/CategoryList/CategoryListItem.scss';

import './components/domain/ArticleList/ArticleList.scss';
import './components/domain/ArticleList/ArticleListItem.scss';

import Root from './routes/Root';

import Category from './routes/Category/Category';
import Article from './routes/Article/Article';

import './shared/styles/reset.scss';
import './shared/styles/typography.scss';
import './shared/styles/variables.scss';
import './shared/styles/animations.scss';
import './shared/styles/theme.scss';

// Todo: rewrite to page component (?)
import './shared/styles/page.scss';

import { IThemeContext } from './types/App';
import ThemeContext from './context/Theme';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/category/:slug",
    element: <Category />,
  },
  {
    path: "/article/:slug",
    element: <Article />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function Main() {
  const ThemeSettings = useContext<IThemeContext>(ThemeContext);

  useEffect(() => {
    document.body.classList.add(`theme-${ThemeSettings.variant}`);
  }, [ThemeSettings]);

  return (
    <ThemeContext.Provider value={ThemeSettings}>
      <RouterProvider router={Router} />
    </ThemeContext.Provider>
  );
}

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// TODO:
// ADD CONTAINERS
// ARTICLE CONTENT (title, description, content, image)
// ARTICLES API
// TRANSPARENT OTHERS WHEN ONE ARTICLE SELECTED