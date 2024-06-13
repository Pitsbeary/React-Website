import { ICategoryItem, ICategoryListItem } from "../../../types/Category";

export async function getCategories(): Promise<ICategoryListItem[]> {
  const response = await fetch("/data/categories.json");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as ICategoryListItem[];
}

export async function getCategory(slug: string): Promise<ICategoryItem | null> {
  const categories: ICategoryListItem[] = await getCategories();

  const category: ICategoryListItem | undefined = categories.find(
    (category: ICategoryListItem) => {
      return category.slug === slug;
    }
  );

  return category ? (category as ICategoryItem) : null;
}
