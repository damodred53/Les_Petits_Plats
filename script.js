
const fetchRecept = async () => {

    const dataBaseUrl = './dataBases/recipes.js';

    const fetchData = await fetch(dataBaseUrl);

    if (fetchData.ok) {
        const Data = await fetchData.json(); 

    return Data
    }
}

const numberRecept = (data) => {
    console.log(data)
    const numberRecept = document.querySelector('.number_recept');
                 if (numberRecept) {

                    const researchRecept = document.querySelector('.div_number_recept');
                    if (researchRecept) {
                        researchRecept.remove();
                    }

                    const divNumberRecept = document.createElement('h2');
                    divNumberRecept.classList.add('div_number_recept');
                    divNumberRecept.innerText = `${data.length} recettes`;
                    numberRecept.appendChild(divNumberRecept);
                 } else {
                    console.log('impossible d\'afficher le nombre de recettes');
                 }
}


const fetchRecipes = async () => {

    try {
        const responseData = await fetchRecept();

            if (responseData.length > 0) {

                responseData.map((elem) => createRecipes(elem));
                numberRecept(responseData)
                
            } else {
                console.log('La base de données est vide');
            }
        
    } catch (error) {
        console.error('Impossible d\'accéder à la base de données', error);
    }
         
}

fetchRecipes()

const openmenu = (menu) => {
    const dropdown = menu.querySelector('.dropdown-menu');
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
        console.log(dropdown)
    } else {
        dropdown.style.display = "none";
    }
}

const menuDropList1 = document.querySelector('.dropdown1');
const menuDropList2 = document.querySelector('.dropdown2');
const menuDropList3 = document.querySelector('.dropdown3');

menuDropList1.addEventListener('click', () => openmenu(menuDropList1));
menuDropList2.addEventListener('click', () => openmenu(menuDropList2));
menuDropList3.addEventListener('click', () => openmenu(menuDropList3));

/* Gestion de la barre de recherche */

const dataFilter = async (e) => {
    try {
        const inputValue = e.target.querySelector('.form-control').value.toLowerCase();

        if (inputValue.length < 3) {
            alert('Veuillez entrer un mot d\'au moins 3 caractères');
            return;
        } else if (!/^[a-zA-Z]+$/.test(inputValue)) {
            alert('Veuillez entrer uniquement des lettres.');
            return;
        }

        const dataToFilter = await fetchRecept();

        const filteredRecipes = dataToFilter.filter(recipe => {
            const lowerCaseName = recipe.name.toLowerCase();
            const lowerCaseDescription = recipe.description.toLowerCase();
            
            const nameMatch = lowerCaseName.includes(inputValue);
            const descriptionMatch = lowerCaseDescription.includes(inputValue);
            
            const ingredientMatch = recipe.ingredients.some(ingredient => {
                const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
                return lowerCaseIngredient.includes(inputValue);
            });

            return nameMatch || descriptionMatch || ingredientMatch;
        });

        numberRecept(filteredRecipes);

        const galerieDisplay = document.querySelector('.galerie_display');
        galerieDisplay.innerHTML = ''; // Clear the existing content

        filteredRecipes.forEach(recipe => createRecipes(recipe));

    } catch (error) {
        console.error('Impossible d\'accéder à la valeur contenue dans la barre de recherche', error);
    }
}

const formValidation = document.querySelector('.input-group');
formValidation.addEventListener('submit', (e) => {
    e.preventDefault();
    dataFilter(e);
})