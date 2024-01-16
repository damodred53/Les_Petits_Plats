const searchAllDisplayedRecipes = async (tagSelected) => {
    // Stockage des filtres sélectionnés dans ce tableau
    if (!dataSelected.includes(tagSelected)) {
        dataSelected.push(tagSelected);
        console.log(dataSelected);
    }

    let tempFilteredRecipies = [];
    const allCardsDisplayed = document.querySelectorAll('.grille_display');

    // Effacer les recettes actuellement affichées
    allCardsDisplayed.forEach((elem) => {
        elem.remove();
    });

    const allRecipies = await fetchRecept();

    // Initialiser les recettes filtrées avec toutes les recettes disponibles
    let filteredRecipies = [...allRecipies];

    // Appliquer chaque filtre cumulativement aux recettes filtrées précédemment
    dataSelected.forEach((selectedTag) => {
        tempFilteredRecipies = [];

        filteredRecipies.forEach((recipe) => {
            const ingredientsMatch = recipe.ingredients.some(
                (ingredient) => dataSelected.includes(ingredient.ingredient.toLowerCase())
            );

            const applianceMatch = dataSelected.includes(recipe.appliance.toLowerCase());

            const ustensilsMatch = recipe.ustensils.some(
                (ustensil) => dataSelected.includes(ustensil.toLowerCase())
            );

            if (ingredientsMatch || applianceMatch || ustensilsMatch) {
                tempFilteredRecipies.push(recipe);
            }
        });

        // Mettre à jour les recettes filtrées avec le filtre actuel
        filteredRecipies = [...tempFilteredRecipies];
    });

    // Afficher les nouvelles recettes filtrées
    filteredRecipies.forEach((recipe) => createRecipes(recipe));

    // Mise à jour du nombre de recettes trouvées
    numberRecept(filteredRecipies);
};
