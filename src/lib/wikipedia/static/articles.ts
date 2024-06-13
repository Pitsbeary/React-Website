export async function getArticlesFromCateogry(categorySlug: string) {
  const response = await fetch("/data/articles.json");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  // Mock data not filtered
  return await response.json();
}
