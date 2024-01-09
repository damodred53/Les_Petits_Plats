
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

/* Fonction permettant la recherche nominale depuis les menus déroulants de filtre */

const researchButtonFilter = document.querySelectorAll('.form_filter');
if (researchButtonFilter) {

    researchButtonFilter.forEach((elem) => {
        elem.addEventListener('submit', (e) => {
            e.preventDefault();
            dataFilter(e)
        } )
    })
}

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
    console.log(e)
    let inputValue;
    try {

        try {
            inputValue = e.target.querySelector('.form-control').value;
        } catch (error) {
            inputValue = e.target.querySelector('.form_control_filter').value
        }

        // Si le mot tapé par l'utilisateur est inférieur à 3 caractères, renvoie une erreur
        if (inputValue.length < 3) {
            alert('Veuillez entrer un mot d\'au moins 3 caractères');
            return;
        // Si le mot tapé par l'utilisateur contient des chiffres, renvoie une erreur
        } else if (!/^[a-zA-Z]+$/.test(inputValue)) {
            alert('Veuillez entrer uniquement des lettres.');
            return;
        }

        // requête effectuée à la base de données afin de traiter l'ensemble des recettes
        const dataToFilter = await fetchRecept();

        // Création d'un set stockant un exemplaire de chaque recette conforme aux filtres de l'utilisateur
        const uniqueRecipes = new Set();


        const lowerCaseInputValue = inputValue.toLowerCase();
        // expression régulière vérifiant que le mot tapé par l'utilisateur trouve un mot identique exacte dnas les recettes
        const regex = new RegExp(`\\b(${lowerCaseInputValue})\\b`)
        

        // trois boucle for pour filtrer chacune vérifiant un endroit des cards de recettes
        for (let i = 0; i < dataToFilter.length; i++) {
            
            const lowerCaseName = dataToFilter[i].name.toLowerCase();
            // Si le mot à chercher est présent dans le nom
            if (/*lowerCaseName.includes(lowerCaseInputValue)*/  regex.test(lowerCaseName)) {
                uniqueRecipes.add(dataToFilter[i]);
            }

            for (let i = 0; i < dataToFilter.length; i++) {
                const lowerCaseDescription = dataToFilter[i].description.toLowerCase();
            // Si le mot à chercher est présent dans la description
                if (/*lowerCaseDescription.includes(lowerCaseInputValue) */ regex.test(lowerCaseDescription)) {
                    uniqueRecipes.add(dataToFilter[i]);
                }
            }

            
            for (let j = 0; j < dataToFilter[i].ingredients.length; j++) {
                const lowerCaseIngredients = dataToFilter[i].ingredients[j].ingredient.toLowerCase();
            // Si le mot à chercher est présent dans la liste des ingrédients
                if (/*lowerCaseIngredients.includes(lowerCaseInputValue)*/  regex.test(lowerCaseIngredients)) {
                    uniqueRecipes.add(dataToFilter[i]);
                }
            }
        }

        // Les cards conformes à la recherche sont dans mise dans le set qui est ici converti en tableau
        const arrayRecipes = [...uniqueRecipes];

        // modification du nombre de recettes trouvées
        numberRecept(arrayRecipes);

        // suppression des cards déjà affichées afin de mettre l'affichage à jour
        const galerieDisplay = document.querySelector('.galerie_display');
        const cardsToRemove = galerieDisplay.querySelectorAll('.grille_display');
        cardsToRemove.forEach((elem) => {
            elem.remove();
        });

        //Envoi des nouveaux résultats à la fonction template pour la création des nouvelles cards
        [...uniqueRecipes].map((elem) => createRecipes(elem));

    } catch (error) {
        console.error('Impossible d\'accéder à la valeur contenue dans la barre de recherche', error);
    }
}

/**
 * fonction fléchée gérant le traitement du bouton de validation de la barre de recherche
 * @function
 */
const formValidation = document.querySelector('.input-group');
formValidation.addEventListener('submit', (e) => {
    e.preventDefault()
    dataFilter(e);
})



