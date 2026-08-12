export function addCategory(categories, newCategory) {
    categories.push(newCategory);
}
export function deleteCategory(categories, id) {
    return categories.filter((category) => {
        return category.id !== id;
    });
}
export function updateCategory(categories, id, newName, newLimit) {
    const category = categories.find((category) => {
        return category.id === id;
    });
    if (category) {
        category.name = newName;
        category.limit = newLimit;
    }
}
//# sourceMappingURL=category.js.map