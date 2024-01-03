
const fetchRecept = async () => {

    const dataBaseUrl = './dataBases/recipes.js';

    const fetchData = await fetch(dataBaseUrl);

    if (fetchData.ok) {
        const Data = await fetchData.json(); 

    return Data
    }
}


const fetchRecipes = async () => {

    try {
        const responseData = await fetchRecept();

            if (responseData.length > 0) {

                responseData.map((elem) => createRecipes(elem));

                const numberRecept = document.querySelector('.number_recept');
                 if (numberRecept) {
                    const divNumberRecept = document.createElement('h2');
                    divNumberRecept.innerText = `${responseData.length} recettes`;
                    numberRecept.appendChild(divNumberRecept);
                 } else {
                    console.log('impossible d\'afficher le nombre de recettes');
                 }
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
        const inputValue = e.target.querySelector('.form-control').value;
        

        if (inputValue.length < 3 ) {
            alert('veuillez entrer un mot de minimum 3 caractères')
            return
        } else if (!/^[a-zA-Z]+$/.test(inputValue)){  
            alert('Veuillez entrer uniquement des lettres.');
            return;  
        }

        const dataToFilter = await fetchRecept();

        console.log(dataToFilter)
        let arrayTitle = [];

            for (let i = 0; i< dataToFilter.length ; i++) {
                
                const lowerCaseInputValue = inputValue.toLowerCase();
                const lowerCaseName = dataToFilter[i].name.toLowerCase();

                if (lowerCaseName.includes(lowerCaseInputValue)) {
                    arrayTitle.push(dataToFilter[i])
                }  
            }
            for (let i = 0 ; i < dataToFilter.length ; i++) {
                
                const lowerCaseDescription = dataToFilter[i].description.toLowerCase();
                const lowerCaseInputValue = inputValue.toLowerCase();

                if (lowerCaseDescription.includes(lowerCaseInputValue)) {
                    arrayTitle.push(dataToFilter[i])
                }
            }
            for (let i = 0 ; i < dataToFilter.length ; i++) {

                for (let j = 0 ; j < dataToFilter[i].ingredients.length; j++) {
                    const lowerCaseIngredients = dataToFilter[i].ingredients[j].ingredient.toLowerCase()
                    console.log(lowerCaseIngredients)
                    const lowerCaseInputValue = inputValue.toLowerCase();

                    if (lowerCaseIngredients.includes(lowerCaseInputValue)) {
                        arrayTitle.push(dataToFilter[i])
                    }
                }
            }
            

            console.log(arrayTitle)


            const galerieDisplay = document.querySelector('.galerie_display');
            const cardsToRemove = galerieDisplay.querySelectorAll('.grille_display');
            cardsToRemove.forEach((elem) => {
                elem.remove();
            });

            arrayTitle.map((elem) => createRecipes(elem));

        } catch (error) {
            console.error('impossible d\'accéder à la valeur contenu dans la barre de recherche', error);
        }
}

const formValidation = document.querySelector('.input-group');
formValidation.addEventListener('submit', (e) => {
    e.preventDefault()
    dataFilter(e);
})

