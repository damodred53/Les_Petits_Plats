
/* Déclaration des constantes */
const menuDropList1 = document.querySelector('.button1');
const menuDropList2 = document.querySelector('.button2');
const menuDropList3 = document.querySelector('.button3');


window.addEventListener('load', () => {
    //fonction se chargeant une fois la page chargée et va chercher en base de données l'ensemble des recettes
    fetchRecipes();

openmenu(menuDropList1);
openmenu(menuDropList2);
openmenu(menuDropList3);
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

/* implémentation de la fonction listReduced */

const listReduced = (data) => {

    let arrayIngredient = [];
    let arrayAppliance = [];
    let arrayUstensils = [];


    console.log(data)
    const dataForEach = data.forEach((elem) => {
        
        arrayAppliance.push(elem.appliance);
        const getIngredient = elem.ingredients;
        const getIngredient2 = getIngredient.forEach((elem2) => {
            arrayIngredient.push(elem2.ingredient)
        })
        const getUstensils = elem.ustensils
        const getUstensils2 = getUstensils.forEach((elem3) => {
            arrayUstensils.push(elem3)
        })

    })

    /* faire une fonction reduce afin de filtrer les doublons */
    const newArrayAppliance = reduceAppliance(arrayAppliance);
    const newArrayIngredients = reduceIngredients(arrayIngredient);
    const newArrayUstensils = reduceuUstensils(arrayUstensils);

    newArrayIngredients.forEach((item2) => createFilter(item2, "1"));
    newArrayAppliance.forEach((item) => createFilter(item, "2"));
    
    newArrayUstensils.forEach((item3) => createFilter(item3, "3"));

}

const reduceAppliance = (dataAppliance) =>  {

    const reducedAppliance = dataAppliance.reduce((acc, currentData) => {
        if (!acc.includes(currentData)) {
            acc.push(currentData)
        }
        
        return acc;
    }, []);

    return reducedAppliance
}


const reduceIngredients = (dataIngredients) =>  {

    const reducedIngredients = dataIngredients.reduce((acc, currentData) => {
            if (!acc.includes(currentData)) {
                acc.push(currentData)
            }
            
            return acc;
        }, []);

    return reducedIngredients
}

const reduceuUstensils = (dataUstensils) =>  {

    const reducedUstensils = dataUstensils.reduce((acc, currentData) => {
            if (!acc.includes(currentData)) {
                acc.push(currentData)
            }
            
            return acc;
        }, []);  

        return reducedUstensils
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

                // Ici il faut créer les fonctions permettant d'envoyer les résultats au menu de filtre déroulants
                    console.log(responseData)

                   

                    listReduced(responseData);


                // Envoi des données à la fonction de template createRecipes pour la création des cards
                responseData.map((elem) => createRecipes(elem));

                // Envoi des données à la fonction gérant l'affichage du nombre de recettes trouvées
                numberRecept(responseData)
                
            } else {
                console.log('La base de données est vide');
            }
        
    } catch (error) {
        console.error(error);
    }
         
}



/**
 * Fonction gérant l'ouverture des menus déroulants
 * @function
 * @param {*} menu 
 */


const openmenu = (menu) => {
    const dropdown = menu.querySelector('.dropdown');
    const closureSystem = menu.querySelector('.open_closure');

    closureSystem.addEventListener('click', () => {
        if (dropdown.style.display === "none") {
            dropdown.style.display = "flex";
        } else {
            dropdown.style.display = "none";
        }
    });
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

        const regex = new RegExp(`\\b(${inputValue})\\b`);

        const dataToFilter = await fetchRecept();

        const filteredRecipes = dataToFilter.filter(recipe => {
            const lowerCaseName = recipe.name.toLowerCase();
            const lowerCaseDescription = recipe.description.toLowerCase();

            const nameMatch = regex.test(lowerCaseName);
            const descriptionMatch = regex.test(lowerCaseDescription);
            
            const ingredientMatch = recipe.ingredients.some(ingredient => {
                const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
                return regex.test(lowerCaseIngredient);
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
