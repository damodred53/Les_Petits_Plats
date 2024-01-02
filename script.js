





const fetchRecipes = async () => {

    const dataBaseUrl = './dataBases/recipes.js';
    
    try {
        const fetchData = await fetch(dataBaseUrl);

        if (fetchData.ok) {
            const responseData = await fetchData.json()

            if (responseData.length > 0) {
                console.log(responseData)

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


