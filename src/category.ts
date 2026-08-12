import type { Category } from "./type";

export function addCategory(
  categories: Category[],
  newCategory: Category,
): void {
  categories.push(newCategory);
}

export function deleteCategory(categories: Category[], id: number): Category[] {
  return categories.filter((category) => {
    return category.id !== id;
  });
}

export function updateCategory(
  categories: Category[],
  id: number,
  newName: string,
  newLimit: number,
): void {
  const category = categories.find((category) => {
    return category.id === id;
  });
  if (category) {
    category.name = newName;
    category.limit = newLimit;
  }
}
