export function addCategory(categories, newCategory) {
    categories.push(newCategory);
}
export function deleteCategory(categories, id) {
    return categories.filter((category) => {
        return category.id !== id;
    });
}
//# sourceMappingURL=category.js.map