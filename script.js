
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
    newArrayAppliance = reduceAppliance(arrayAppliance);
    newArrayIngredients = reduceIngredients(arrayIngredient);
    newArrayUstensils = reduceuUstensils(arrayUstensils);

    /*console.log(newArrayAppliance)
    console.log(newArrayIngredients)
    console.log(newArrayUstensils)*/

    refreshFilter()

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
    console.log(menu)
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
    try {

        try {

            inputValue = e.target.querySelector('.form-control').value;


        } catch (error) {
            inputValue = e.target.querySelector('.form_control_filter').value
        } 


        if (inputValue) {
            
            const varEscapeHTML = escapeHTML(inputValue);

        }
            
        
           

        // requête effectuée à la base de données afin de traiter l'ensemble des recettes
        const dataToFilter = await fetchRecept();

        // Création d'un set stockant un exemplaire de chaque recette conforme aux filtres de l'utilisateur
        const uniqueRecipes = new Set();


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

        const nothingFound = document.querySelector('.section_nothing_found_paragraph');
        if (arrayRecipes.length < 1) {
            
            nothingFound.innerText = `Aucune recette ne contient  ${inputValue} vous pouvez chercher \"tarte aux pommes\", " 
            "\"poisson\", etc ..."; `
            
        } else {
            if (nothingFound) {
                nothingFound.innerText = "";
            }
            //Envoi des nouveaux résultats à la fonction template pour la création des nouvelles cards
            console.log([...uniqueRecipes]);
        [...uniqueRecipes].map((elem) => createRecipes(elem));


        listReduced([...uniqueRecipes])
        
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

/* fonction vidant le champ input text */

const eraseTextContent = (data) => {
    data.value = "";
    const crossMainSearch = document.querySelector('.cross_filter_main_input');

        crossMainSearch.style.display = "none";
    




    return erasure;
};

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




const allArray = () => {
    const allArray = [...newArrayAppliance , ...newArrayIngredients, ...newArrayUstensils]
    return allArray
}

/**
 * fonction servant à effacer le tag dans l'interface lorsqu'on décoche la selection dnas le menu déroulant
 * @param {*} e 
 */
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


const searchAllDisplayedRecipes = async (tagSelected) => {

    // Stockage des filtres sélectionnés dans ce tableau
    
    refreshFilter();
    console.log(arrayRecipes)
    console.log(filteredRecipies)
    console.log(dataSelected);

if (tagSelected !== undefined) {
    // Stockage des filtres sélectionnés dans ce tableau
    if (!dataSelected.includes(tagSelected)) {
        dataSelected.push(tagSelected);

    }
}

console.log(dataSelected);
    
    /*let tempFilteredRecipies = [];*/

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


    // cas où aucune recherche n'est faite 
    if (recepiesTotalLength === allCardsDisplayedLength) {
        arrayRecipes = recepiesTotal;
    }

   
        
  
    

    // Appliquer chaque filtre cumulativement aux recettes filtrées précédemment

    console.log(arrayRecipes);
    console.log(dataSelected);

   for (let i = 0 ; i <dataSelected.length ; i++) {
   
        console.log(arrayRecipes)
        
        
        
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
        console.log(filteredRecipes); // Affichez les recettes qui passent le filtre actuel
        console.log(arrayRecipes);
        
        
   ;
   }
        

    

    // Afficher les nouvelles recettes filtrées
    arrayRecipes.map((recipe) => createRecipes(recipe));
    console.log(arrayRecipes);
   

    

    

    // suppression de l'ensemble des tags existant
    
    listReduced(arrayRecipes);

    // Mise à jour du nombre de recettes trouvées
    numberRecept(arrayRecipes);
    /*return arrayRecipes*/
};


/* élément qui supprime du tableau dataSelected les filtres effacés */
const clickToEraseDataSelectedFilter = (e) => {

    const parentNode = (e.target.parentNode)
    const nameFilter = parentNode.querySelector('.list_element').innerText 
    console.log(nameFilter)

    const indexToRemove = dataSelected.indexOf(nameFilter)

    if (indexToRemove !== -1) {
        // L'élément a été trouvé dans le tableau
        dataSelected.splice(indexToRemove, 1);

        if (dataSelected.length === 0) {
            console.log(dataSelected.length)
        fetchRecipes()
        } else {

        searchAllDisplayedRecipes()
        setTimeout(() => {
            testBidouillage(e);
        }, 150);
        }
        

    } else {
        console.log("L'élément n'a pas été trouvé dans le tableau.");
    }
}


const erasureFromFilterList = (e) => {


    
// suppression du tag en lui-même

    const parentNode = (e.target.parentNode)
                console.log(parentNode)
                const nameFilter = parentNode.querySelector('.list_element').innerText 

                parentNode.remove()

                // suppression dnas le menu déroulant du tag qui était en mode selectionné

                const allElement = document.querySelectorAll('.div_filter_list') 

                    allElement.forEach((elem) => {

                        if(elem.innerText == nameFilter) {

                            elem.classList.remove('yellow_cross');
                            const crossToErase = elem.querySelector('.cross_filter_list');
                            crossToErase.style.display = "none";
                        }
                    })


                    // retrait du tag de dataselected
                    const indexToRemove = dataSelected.indexOf(nameFilter)

                    if (indexToRemove !== -1) {
                        // L'élément a été trouvé dans le tableau
                        dataSelected.splice(indexToRemove, 1);

                
                        // suppression de l'ensemble des tags existant
                        /*if (dataSelected.length === 0) {
                            fetchRecipes()
                        } else {
                            searchAllDisplayedRecipes()
                        }*/
                        
                        
                        
                
                    } else {
                        console.log("L'élément n'a pas été trouvé dans le tableau.");
                    }
}

// rafraichissement des données contenus dans les filtres des menus déroulants

const refreshFilter = () => {
    const allDiv = document.querySelectorAll('.div_filter_list');

    allDiv.forEach((element) => {
        element.remove()
        
    })
    
}

const testBidouillage = () => {
    let allDivInFilter = [];
    let allElements = [];


                const nameFilter = document.querySelectorAll('.div_filter_list')
                
                nameFilter.forEach((elem) => {
                    
                    allDivInFilter.push(elem)
                })
                

                // suppression dans le menu déroulant du tag qui était en mode selectionné

                const allElement = document.querySelectorAll('.displayed_tags') 
                /*const cross = document.querySelectorAll('.cross_filter_list');*/
                allElement.forEach((element) =>  {
                    allElements.push(element.innerText)
                })




                allDivInFilter.forEach((name) => {

                    if (allElements.includes(name.innerText)) {
                        name.classList.add('yellow_cross');
                        const cross = name.querySelector('.cross_filter_list');
                        cross.style.display = "flex";

                        cross.addEventListener('click', (e) => {
                            const parentNode = e.target.parentNode

                            parentNode.classList.remove('yellow_cross');
                            e.stopPropagation();
                            cross.style.display = "none";  
                            
                            
                        })
                    }
                    
                })
} 

/* fonction protégeant des injection XSS */

const escapeHTML = (input) => {
    return input.replace(/[&<>"']/g, function(match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match];
    });
}