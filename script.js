
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
        const inputValue = e.target.querySelector('.form-control').value;

        if (inputValue.length < 3) {
            alert('Veuillez entrer un mot d\'au moins 3 caractères');
            return;
        } else if (!/^[a-zA-Z]+$/.test(inputValue)) {
            alert('Veuillez entrer uniquement des lettres.');
            return;
        }

        const dataToFilter = await fetchRecept();

        const uniqueRecipes = new Set();

        for (let i = 0; i < dataToFilter.length; i++) {
            const lowerCaseInputValue = inputValue.toLowerCase();
            const lowerCaseName = dataToFilter[i].name.toLowerCase();

            if (lowerCaseName.includes(lowerCaseInputValue)) {
                uniqueRecipes.add(dataToFilter[i]);
            }

            const lowerCaseDescription = dataToFilter[i].description.toLowerCase();

            if (lowerCaseDescription.includes(lowerCaseInputValue)) {
                uniqueRecipes.add(dataToFilter[i]);
            }

            for (let j = 0; j < dataToFilter[i].ingredients.length; j++) {
                const lowerCaseIngredients = dataToFilter[i].ingredients[j].ingredient.toLowerCase();

                if (lowerCaseIngredients.includes(lowerCaseInputValue)) {
                    uniqueRecipes.add(dataToFilter[i]);
                }
            }
        }

        const arrayRecipes = [...uniqueRecipes];
        numberRecept(arrayRecipes);

        const galerieDisplay = document.querySelector('.galerie_display');
        const cardsToRemove = galerieDisplay.querySelectorAll('.grille_display');
        cardsToRemove.forEach((elem) => {
            elem.remove();
        });

        [...uniqueRecipes].map((elem) => createRecipes(elem));

    } catch (error) {
        console.error('Impossible d\'accéder à la valeur contenue dans la barre de recherche', error);
    }
}

const formValidation = document.querySelector('.input-group');
formValidation.addEventListener('submit', (e) => {
    e.preventDefault()
    dataFilter(e);
})

