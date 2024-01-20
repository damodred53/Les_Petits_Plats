function filterRecipesByKeywords(recipes, dataSelected) {
    const tempFilteredRecipies = [];

    recipes.forEach(recipe => {
        const keywords = dataSelected.map(keyword => keyword.toLowerCase());

        const recipeKeywords = [
            ...recipe.ustensils.map(item => item.toLowerCase()),
            recipe.appliance.toLowerCase(),
            ...recipe.ingredients.map(item => item.ingredient.toLowerCase())
        ];

        if (keywords.some(keyword => recipeKeywords.includes(keyword))) {
            tempFilteredRecipies.push(recipe);
        }
    });

    return tempFilteredRecipies;
}