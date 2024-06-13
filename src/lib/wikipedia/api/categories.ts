import axios from "axios";
import { ICategoryItem } from "../../../types/Category";

export async function getCategory(
  categorySlug: string
): Promise<ICategoryItem | null> {
  try {
    // Todo: use the correct endpoint here
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        prop: "info|extracts",
        titles: `Category:${categorySlug}`,
        exintro: true,
        explaintext: true,
        origin: "*", // This is needed to avoid CORS issues
      },
    });

    const pages = response.data.query.pages;

    const categoryId = Object.keys(pages)[0];
    const categoryInfo = pages[categoryId];

    return {
      title: String(categoryInfo.title).replace("Category:", " "),
      extract: categoryInfo.extract,

      slug: String(categoryInfo.title)
        .replace("Category:", " ")
        .replace(" ", "_"),
    };
  } catch (error) {
    console.error(
      `Error fetching details for category ${categorySlug}:`,
      error
    );
    return null;
  }
}
