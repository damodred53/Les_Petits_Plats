
/* Déclaration des constantes */
const menuDropList1 = document.querySelector('.button1');
const menuDropList2 = document.querySelector('.button2');
const menuDropList3 = document.querySelector('.button3');

let arrayIngredient = [];
let arrayAppliance = [];
let arrayUstensils = [];
let inputValue = "";

let newArrayAppliance = [];
let newArrayIngredients = [];
let newArrayUstensils = [];






window.addEventListener('load', () => {
    //fonction se chargeant une fois la page chargée et va chercher en base de données l'ensemble des recettes
    fetchRecipes();

openmenu(menuDropList1);
openmenu(menuDropList2);
openmenu(menuDropList3);

/* stop */

const formControl = document.querySelector('.form-control');
const crossMainSearch = document.querySelector('.cross_filter_main_input');
formControl.addEventListener('input', () => {
    let inputValue = formControl.value;

    if (inputValue) {
        crossMainSearch.style.display = "flex";
        
    } else {
        crossMainSearch.style.display = "none";
    }
});

crossMainSearch.addEventListener('click', () => {
    eraseTextContent(formControl)
})



   


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

/**
 *   implémentation de la fonction listReduced permettant de prélever dans la base de données les recettes, les ustensils et les appareils*/

const listReduced = (data) => {

        data.forEach((elem) => {
        
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

    /* faire des fonctions reduce afin de filtrer les doublons */
    newArrayAppliance = reduceAppliance(arrayAppliance);
    newArrayIngredients = reduceIngredients(arrayIngredient);
    newArrayUstensils = reduceuUstensils(arrayUstensils);

    

    newArrayIngredients.forEach((item2) => createFilter(item2, "1"));
    newArrayAppliance.forEach((item) => createFilter(item, "2"));
    newArrayUstensils.forEach((item3) => createFilter(item3, "3"));

}

const reduceAppliance = (dataAppliance) =>  {

    const reducedAppliance = dataAppliance.reduce((acc, currentData) => {
        const lowerCaseCurrentData = currentData.toLowerCase();
        if (!acc.includes(lowerCaseCurrentData)) {
            acc.push(lowerCaseCurrentData)
        }
        
        return acc;
    }, []);

    return reducedAppliance
}


const reduceIngredients = (dataIngredients) =>  {
    
    const reducedIngredients = dataIngredients.reduce((acc, currentData) => {
        const lowerCaseCurrentData = currentData.toLowerCase();
            if (!acc.includes(lowerCaseCurrentData)) {
                acc.push(lowerCaseCurrentData)
            }
            
            return acc;
        }, []);

    return reducedIngredients
}

const reduceuUstensils = (dataUstensils) =>  {
    
    const reducedUstensils = dataUstensils.reduce((acc, currentData) => {
        const lowerCaseCurrentData = currentData.toLowerCase();
            if (!acc.includes(lowerCaseCurrentData)) {
                acc.push(lowerCaseCurrentData)
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

                //Envoi des données à la fonction permettant de remplir les menus déroulants
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
    const textInputDropdown = menu.querySelector('.form_control_filter');
    const cross = menu.querySelector('.cross_filter');
    const dataMenu = menu.querySelectorAll('.div_filter_list');

    closureSystem.addEventListener('click', () => {
        if (dropdown.style.display === "none") {
            dropdown.style.display = "flex";

            textInputDropdown.addEventListener('input', handleInput);
            

            cross.addEventListener('click', handleCrossClick);

            handleSelection(menu);

            generateTag(menu)

        } else {
            dropdown.style.display = "none";
        }
    });

    // Fonction pour gérer l'entrée de l'utilisateur
    const handleInput = () => {
        const textInputDropdownValue = textInputDropdown.value;

        if (textInputDropdownValue.length > 0) {
            cross.style.display = "flex";
        } else {
            cross.style.display = "none";
        }

        if (textInputDropdownValue.length >= 3) {
            filterThings(textInputDropdownValue, menu);
        }
    };

    // Fonction pour gérer le clic sur la croix
    const handleCrossClick = (e) => {
        e.stopPropagation();
        const erasureContent = eraseTextContent(textInputDropdown);
        filterThings(erasureContent, menu);
        e.target.style = "none";
    };
};

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
            /*const formControl = e.target.querySelector('.form-control');
            console.log(formControl)*/
            inputValue = e.target.querySelector('.form-control').value;
            /*formControl.addEventListener('input', handleInputMainSearch(inputValue));*/

        } catch (error) {
            inputValue = e.target.querySelector('.form_control_filter').value
        }

            if (inputValue.length > 0) {
                // Si le mot tapé par l'utilisateur contient des chiffres, renvoie une erreur
        /*} else*/ if (!/^[a-zA-Z]+$/.test(inputValue) ) {
            alert('Veuillez entrer uniquement des lettres.');
            return;
        }
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
        const nothingFound = document.querySelector('.section_nothing_found_paragraph');
        if (arrayRecipes.length < 1) {
            
            nothingFound.innerText = `Aucune recette ne contient  ${inputValue} vous pouvez chercher \"tarte aux pommes\", " 
            "\"poisson\", etc ..."; `
            
        } else {
            if (nothingFound) {
                nothingFound.innerText = "";
            }
            //Envoi des nouveaux résultats à la fonction template pour la création des nouvelles cards
        [...uniqueRecipes].map((elem) => createRecipes(elem));
        }
        

    } catch (error) {
        console.error('Impossible d\'accéder à la valeur contenue dans la barre de recherche', error);
    }
}

/*const handleInputMainSearch = (inputValueData) => {
    
    console.log(inputValueData)
    const crossMainSearch = document.querySelector('.cross_filter_main_input');


            if (inputValueData) {
                crossMainSearch.style.display = "flex";
                
            } else {
                crossMainSearch.style.display = "none";
            }

}*/

/**
 * fonction fléchée gérant le traitement du bouton de validation de la barre de recherche
 * @function
 */
const formValidation = document.querySelector('.input-group');
formValidation.addEventListener('submit', (e) => {
    e.preventDefault()
    dataFilter(e);
})

/* fonction vidant le champ input text */

const eraseTextContent = (data) => {
    const erasure = data.value = "";
    return erasure;
}

const filterThings = (inputContentValue, menu) => {
    console.log(menu)
    const lowerCaseInput = inputContentValue.toLowerCase()
    // Vérification de la classe de menu et utilisation du numéro correspondant dans createFilter
    let switchNumber;
    let result;

    if (menu.classList.contains('button1')) {
        switchNumber = "1";
        result = reduceIngredients(arrayIngredient);
    } else if (menu.classList.contains('button2')) {
        switchNumber = "2";
        result = reduceAppliance(arrayAppliance);
    } else if (menu.classList.contains('button3')) {
        switchNumber = "3";
        result = reduceuUstensils(arrayUstensils);
    }

    
    
    const regexIngredient = new RegExp(`${lowerCaseInput}`);
    let filteredArray = [];

    for (let i=0 ; i < result.length ; i++) {

        if (regexIngredient.test(result[i].toLowerCase())) {
            filteredArray.push(result[i]);
            
        }

    }
    
    
   /* gestion de selection des éléments dans les menus déroulants */
    const allMenuDisplayed = menu.querySelectorAll('.div_filter_list');

    
    allMenuDisplayed.forEach((e) => {
        e.remove();

    })
    filteredArray.forEach((elem) => createFilter(elem, switchNumber))
    
}

const handleSelection = () => {
    /* gestion de la selection des éléments de la liste */

    const divFilterList = document.querySelectorAll('.div_filter_list');

    /*const crossByTag = document.querySelectorAll('.cross_filter_list_tags');
crossByTag.forEach((cross) => {
    cross.addEventListener('click', (e) => {
        console.log(e)
        eraseTag()
    });
});*/
    
    divFilterList.forEach((elem) => {
        const cross = elem.querySelector('.cross_filter_list');
        
        elem.addEventListener('click', (e) => {
                
                if (!elem.classList.contains('yellow_cross')) {
                    elem.classList.add('yellow_cross');
                    
                    cross.style.display = "flex";
                    
                } 

        })
        cross.addEventListener('click', (e) => {
            e.stopPropagation();
            cross.style.display = "none";
            elem.classList.remove('yellow_cross');

            /*const allArray = [...newArrayAppliance , ...newArrayIngredients, ...newArrayUstensils]
            console.log(allArray)*/
        })
        
    })
}

const generateTag = (data) => {
    console.log(data);

    const dataMenu = data.querySelectorAll('.div_filter_list');
    const closureDropdownList = data.querySelector('.open_closure');

    const clickHandler = (elem) => {
        createFilter(elem.target.innerText, "4");
    };

    const closureClickHandler = () => {
        dataMenu.forEach((elem) => {
            elem.removeEventListener('click', clickHandler);
        });

        closureDropdownList.removeEventListener('click', closureClickHandler);
    };

    dataMenu.forEach((elem) => {
        elem.addEventListener('click', clickHandler);
    });

    closureDropdownList.addEventListener('click', closureClickHandler);
};


const allArray = () => {
    const allArray = [...newArrayAppliance , ...newArrayIngredients, ...newArrayUstensils]
    return allArray
}

const clickToEraseTags = (e) => {

    const parentNode = (e.target.parentNode)
    const nameFilter = parentNode.querySelector('.list_element').innerText 
    console.log(nameFilter)

    const allTagsFilterList = document.querySelectorAll('.tag_filter_list');
    console.log(allTagsFilterList)

    allTagsFilterList.forEach((elem) => {
        if (elem.innerText === nameFilter) {
            elem.remove()
        } 
    })
                
}
