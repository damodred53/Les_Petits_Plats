
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
let dataSelected = [];
let filteredRecipies = [];

// variable récupérant l'ensemble des valeurs filtré après la recherche nominale
let arrayRecipes = [];

// variable de stockage des recettes après un filtre nominal, les tags filtrent depuis cette liste
let saveFormData =  [];


window.addEventListener('load', () => {
    //fonction se chargeant une fois la page chargée et va chercher en base de données l'ensemble des recettes
    fetchRecipes();

    const closureAllDropdownMenu = document.querySelectorAll('.dropdown')
    closureAllDropdownMenu.forEach((elem) => {
        elem.style.display = "none";
    })
    
openmenu(menuDropList1);
openmenu(menuDropList2);
openmenu(menuDropList3);

const formControl = document.querySelector('.form-control');
const crossMainSearch = document.querySelector('.cross_filter_main_input');

formControl.addEventListener('input', () => {
    let inputValue = formControl.value;
// la croix dans le formulaire apparait ou disparait en fonction du contenu du formulaire
    if (inputValue.length >= 1) {
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
    divNumberRecept.innerText = `${data.length} ${data.length > 1 ? "recettes" :  "recette"}`;
    numberRecept.appendChild(divNumberRecept);
    } else {
    console.log('impossible d\'afficher le nombre de recettes');
    }
}

/**
 *   implémentation de la fonction listReduced permettant de prélever dans la base de données les recettes, les ustensils et les appareils*/

const listReduced = (data) => {

arrayIngredient = [];
arrayAppliance = [];
arrayUstensils = [];

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
    newArrayAppliance = reduceList(arrayAppliance);
    newArrayIngredients = reduceList(arrayIngredient);
    newArrayUstensils = reduceList(arrayUstensils);

    refreshFilter()

    // Mise à jour des nouveaux filtres
    newArrayIngredients.forEach((item2) => createFilter(item2, "1"));
    newArrayAppliance.forEach((item) => createFilter(item, "2"));
    newArrayUstensils.forEach((item3) => createFilter(item3, "3"));
    
}

const reduceList = (data) =>  {

    const reducedList = data.reduce((acc, currentData) => {
        const lowerCaseCurrentData = currentData.toLowerCase();
        if (!acc.includes(lowerCaseCurrentData)) {
            acc.push(lowerCaseCurrentData)
        }
        return acc;
    }, []);

    return reducedList
}

/**
 * Fonction permettant d'aller d'appeler fetchrecept puis de traiter d'envoyer les données au template pour créer les cards
 * @function
 * 
 */

const fetchRecipes = async (tagFilter) => {

    try {
        // Appel de la fonction fetchRecept pour chercher dans la base de données
        const responseData = await fetchRecept();

        // si la réponse de la base de donnée contient au moins 1 élément
            if (responseData.length > 0) {

                //Envoi des données à la fonction permettant de remplir les menus déroulants
                listReduced(responseData);

                //On vide l'affichage des recettes avant affichées
                const test = document.querySelectorAll('.grille_display');
                if (test) {
                    test.forEach((element) => {
                        element.remove()
                    })   
                } 
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

    closureSystem.addEventListener('click', () => {
        if (dropdown.style.display === "none") {
            dropdown.style.display = "flex";
            closureSystem.classList.remove('open_closure_active');
            textInputDropdown.addEventListener('input', handleInput);
            cross.addEventListener('click', handleCrossClick);
            
            generateTag(menu)

        } else {
            dropdown.style.display = "none";
            closureSystem.classList.add('open_closure_active');
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

    let inputValue;
    dataSelected = [];
    try {
        try {
            inputValue = e.target.querySelector('.form-control').value;
        } catch (error) {
            inputValue = e.target.querySelector('.form_control_filter').value
        } 

        if (inputValue) {
            // gestion des échappements des symboles HTML afin d'éviter les injections malveillantes
            const result = escapeHTML(inputValue);
            console.log(result)
        }

        // requête effectuée à la base de données afin de traiter l'ensemble des recettes
        const dataToFilter = await fetchRecept();
        const lowerCaseInputValue = inputValue.toLowerCase();
        // expression régulière vérifiant que le mot tapé par l'utilisateur trouve un mot identique exacte dnas les recettes
        const regex = new RegExp(`\\b(${lowerCaseInputValue})\\b`)
        
        
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
        
        arrayRecipes = filteredRecipes
        // mise en sauvegarde pour le filtre par tags des recettes conservées par le filtre nominal
        saveFormData = filteredRecipes;

        // modification du nombre de recettes trouvées
        numberRecept(arrayRecipes);

        // suppression des cards déjà affichées afin de mettre l'affichage à jour
        const galerieDisplay = document.querySelector('.galerie_display');
        const cardsToRemove = galerieDisplay.querySelectorAll('.grille_display');
        cardsToRemove.forEach((elem) => {
            elem.remove();
        });

        const allTagsToErase = document.querySelectorAll('.tag_filter_list');
        allTagsToErase.forEach((element) => {
            element.remove()
        })

        // gestion du message d'erreur si la recherche de l'utilisateur ne conserve aucune recette
        const nothingFound = document.querySelector('.section_nothing_found_paragraph');
        if (arrayRecipes.length < 1) {
            
            nothingFound.innerText = `Aucune recette ne contient  ${inputValue} vous pouvez chercher \"tarte aux pommes\",  
            "poisson", etc ..."; `
        } else {
            if (nothingFound) {
                nothingFound.innerText = "";
            }

            //Envoi des nouveaux résultats à la fonction template pour la création des nouvelles cards
            arrayRecipes.map((elem) => createRecipes(elem));


        listReduced(arrayRecipes)
        }
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
    e.preventDefault();
    dataFilter(e);
})

/**
 * fonction vidant le champ input text
 *  */  

const eraseTextContent = (data) => {
    const erasure = data.value = "";
    const crossMainSearch = document.querySelector('.cross_filter_main_input');
    crossMainSearch.style.display = "none";
    saveFormData = [];
    return erasure;
};

const filterThings = (inputContentValue, menu) => {

    const lowerCaseInput = inputContentValue.toLowerCase()
    // Vérification de la classe de menu et utilisation du numéro correspondant dans createFilter
    let switchNumber;
    let result;

    if (menu.classList.contains('button1')) {
        switchNumber = "1";
        result = reduceList(arrayIngredient);
    } else if (menu.classList.contains('button2')) {
        switchNumber = "2";
        result = reduceList(arrayAppliance);
    } else if (menu.classList.contains('button3')) {
        switchNumber = "3";
        result = reduceList(arrayUstensils);
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

/**
 * fonction permettant l'intégration de nouveaux filtres dans l'interface utilisateur
 */
const generateTag = () => {
    
    const dataMenu = document.querySelectorAll('.list_filter');
    const closureDropdownList = document.querySelectorAll('.open_closure');

    const clickHandler = (elem) => {
        let innerTextTag = [];
        const allTagsDisplayed = document.querySelectorAll('.displayed_tags')
            allTagsDisplayed.forEach((tag) => {
                innerTextTag.push(tag.innerText)

            })
            
            if (innerTextTag.includes(elem.target.innerText) ) {
                console.log('la tag est déjà présent dans la liste des filtres')
            } else {
                
                createFilter(elem.target.innerText, "4");
            }        
        
    };


    const closureClickHandler = () => {
        dataMenu.forEach((elem) => {
            elem.removeEventListener('click', clickHandler);
        });

        closureDropdownList.forEach((elem) => {
            elem.removeEventListener('click', closureClickHandler);

        });
    };

    dataMenu.forEach((elem) => {
        elem.addEventListener('click', clickHandler);
    });


    closureDropdownList.forEach((elem) => {
        elem.addEventListener('click', closureClickHandler);
    })
};

/**
 * fonction permettant la gestion des tags
 * @param {*} tagSelected 
 */
const searchAllDisplayedRecipes = async (tagSelected) => {

    // Stockage des filtres sélectionnés dans ce tableau
    
    refreshFilter();  

if (tagSelected !== undefined) {
    // Stockage des filtres sélectionnés dans ce tableau
    if (!dataSelected.includes(tagSelected)) {
        dataSelected.push(tagSelected);
    }
}

    const allCardsDisplayed = document.querySelectorAll('.grille_display');
    const allCardsDisplayedLength = allCardsDisplayed.length 
    console.log(allCardsDisplayedLength)
    const recepiesTotal = await fetchRecept();
    const recepiesTotalLength = recepiesTotal.length
    console.log(recepiesTotalLength)
    // Effacer les recettes actuellement affichées
    allCardsDisplayed.forEach((elem) => {
        elem.remove();
    });


    console.log(saveFormData.length)
    if (saveFormData.length === 0) {
        arrayRecipes = recepiesTotal;
    } else {
        arrayRecipes = saveFormData;
    }

   for (let i = 0 ; i <dataSelected.length ; i++) {

        // Filtrer les recettes qui correspondent au filtre en cours
        const filteredRecipes = arrayRecipes.filter((recipe) => {
            
        const ingredientsMatch = recipe.ingredients.some(
            (ingredient) => {
                const regex = new RegExp(`\\b${dataSelected[i]}\\b`, 'i');
                return regex.test(ingredient.ingredient.toLowerCase());
            }
        );
        
        const applianceMatch = recipe.appliance.toLowerCase().includes(dataSelected[i]);
    
        const ustensilsMatch = recipe.ustensils.some(
            (ustensil) => {
                const regex = new RegExp(`\\b${dataSelected[i]}\\b`, 'i');
                return regex.test(ustensil.toLowerCase());
            }
        );
                    
            return ingredientsMatch || applianceMatch || ustensilsMatch;
        });
        arrayRecipes = filteredRecipes;
   }
        
    // Afficher les nouvelles recettes filtrées
    arrayRecipes.map((recipe) => createRecipes(recipe));
    console.log(arrayRecipes);
   
    // suppression de l'ensemble des tags existant
    
    listReduced(arrayRecipes);

    // Mise à jour du nombre de recettes trouvées
    numberRecept(arrayRecipes);
};

// rafraichissement des données contenus dans les filtres des menus déroulants

const refreshFilter = () => {
    const allDiv = document.querySelectorAll('.div_filter_list');

    allDiv.forEach((element) => {
        element.remove()   
    })
}



