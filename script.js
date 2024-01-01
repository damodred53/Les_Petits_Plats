





const fetchRecipes = async () => {

    const dataBaseUrl = './dataBases/recipes.js';
    
    try {
        const fetchData = await fetch(dataBaseUrl);

        if (fetchData.ok) {
            const responseData = await fetchData.json()

            if (responseData.length > 0) {
                console.log(responseData)

                responseData.map((elem) => createRecipes(elem));
            } else {
                console.log('La base de données est vide');
            }
        } 
    } catch (error) {
        console.error('Impossible d\'accéder à la base de données', error);
    }
        


    
    
    

    
}


fetchRecipes()


/*createRecipes()*/