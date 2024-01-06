
/* Déclaration des constantes */

const menuDropList1 = document.querySelector('.dropdown1');
const menuDropList2 = document.querySelector('.dropdown2');
const menuDropList3 = document.querySelector('.dropdown3');

menuDropList1.addEventListener('click', () => openmenu(menuDropList1));
menuDropList2.addEventListener('click', () => openmenu(menuDropList2));
menuDropList3.addEventListener('click', () => openmenu(menuDropList3));

window.addEventListener('load', () => {
    //fonction se chargeant une fois la page chargée et va chercher en base de données l'ensemble des recettes
    fetchRecipes();
})

/**
 * Fonction interrogeant la base de données et convertissant les données potentielles au format json.
 * @function
 * @returns tableau d'objet au format json
 */
const fetchRecept = async () => {

    const dataBaseUrl = './dataBases/recipes.js';

    const fetchData = await fetch(dataBaseUrl);

    if (fetchData.ok) {
        const Data = await fetchData.json(); 

    return Data
    }
}

/**
 * fonction gérant l'affichage du nombre de recettes trouvées en fonction de la recherche utilisateur
 * @function
 * @param {*} data 
 */

const numberRecept = (data) => {

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

/**
 * Fonction permettant d'aller d'appeler fetchrecept puis de traiter d'envoyer les données au template pour créer les cards
 * @function
 * 
 */

const fetchRecipes = async () => {

    try {
        
        // Appel de la fonction fetchRecept pour chercher dans la base de données
        const responseData = await fetchRecept();

        // si la réponse de la base de donnée contient au moins 1 élément
            if (responseData.length > 0) {

                // Envoi des données à la fonction de template createRecipes pour la création des cards
                responseData.map((elem) => createRecipes(elem));

                // Envoi des données à la fonction gérant l'affichage du nombre de recettes trouvées
                numberRecept(responseData)
                
            } else {
                console.log('La base de données est vide');
            }
        
    } catch (error) {
        console.error('Impossible d\'accéder à la base de données', error);
    }
         
}



/**
 * Fonction gérant l'ouverture des menus déroulants
 * @function
 * @param {*} menu 
 */

const openmenu = (menu) => {
    const dropdown = menu.querySelector('.dropdown-menu');
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
        console.log(dropdown)
    } else {
        dropdown.style.display = "none";
    }
}



/**
 * Fonction gérant les recherches effectuées par la barre de recherche par l'utilisateur
 * @param {*} e 
 * @returns 
 */

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

        /*const regex = new RegExp(`\\b(${lowerCaseInputValue})\\b`);*/
        

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
        galerieDisplay.innerHTML = '';

        filteredRecipes.forEach(recipe => createRecipes(recipe));

    } catch (error) {
        console.error('Impossible d\'accéder à la valeur contenue dans la barre de recherche', error);
    }
}

/**
 * Fonction traitant les opérations une fois une recherche entrée dnas la barre de recherche
 * @function
 */
const formValidation = document.querySelector('.input-group');
formValidation.addEventListener('submit', (e) => {
    e.preventDefault();
    dataFilter(e);
})