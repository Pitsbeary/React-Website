import axios from "axios";

import { IArticleListItem, IArticleItem } from "../../../types/Article";

export async function getArticle(
  articleSlug: string
): Promise<IArticleItem | null> {
  try {
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        prop: "extracts",
        exintro: true,
        explaintext: true,
        titles: articleSlug,
        origin: "*", // This is needed to avoid CORS issues
      },
    });

    const articles = response.data.query.pages;
    const articleId = Object.keys(articles)[0];

    const articleData = articles[articleId];

    return {
      title: articleData.title,
      extract: articleData.extract,

      slug: String(articleData.title).replace(" ", "_"),
    };
  } catch (error) {
    console.error(
      `Error fetching introductory text for article ${articleSlug}:`,
      error
    );
    return null;
  }
}

export async function getArticlesFromCateogry(
  categorySlug: string,
  limit: number = 10
): Promise<IArticleListItem[]> {
  try {
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        list: "categorymembers",
        cmtitle: `Category:${categorySlug}`,
        cmlimit: limit,
        cmtype: "page",
        origin: "*", // This is needed to avoid CORS issues
      },
    });

    const articles: any[] = response.data.query.categorymembers;

    return articles
      .filter((articleData: any) => {
        return !String(articleData.title).includes("Portal:");
      })
      .map((articleData: any) => {
        return {
          title: articleData.title,
          slug: String(articleData.title).replace(" ", "_"),
        };
      }) as IArticleListItem[];
  } catch (error) {
    console.error("Error fetching category members:", error);
    return [];
  }
}
