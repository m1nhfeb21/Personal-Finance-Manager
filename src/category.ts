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
