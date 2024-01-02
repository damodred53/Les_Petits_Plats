const fetchRecipes = async () => {

    const dataBaseUrl = './dataBases/recipes.js';
    
    try {
        const fetchData = await fetch(dataBaseUrl);

        if (fetchData.ok) {
            const responseData = await fetchData.json()

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

