
const createRecipes = (data) => {
console.log(data)
   try {
        const galerieDisplay = document.querySelector('.galerie_display');
        
        if (galerieDisplay) {

            /* Mise en place des éléments constituant une card menu */

            const myDiv = document.createElement('div');
            const image = document.createElement('img');
            const titleRecept = document.createElement('h2');
            const title = document.createElement('h3');
            const recept = document.createElement('h3');
            const paragraph_recette = document.createElement('p');
            let ingredients = document.createElement('h3');
            let quantityUnit = document.createElement('p');
            const mainGridElement = document.createElement('div');

            /* ajout des attributs pour les différents éléments crées */

            myDiv.classList.add('grille_display');

            image.src = `../assets/Photos P7 JS Les petits plats/${data.image}`;
            image.setAttribute('alt', data.name );
            image.classList.add('image_recept');

            titleRecept.innerText = data.name;
            titleRecept.classList.add('title_recept');

            title.innerText = "RECETTE";
            title.classList.add('title');

            recept.innerText = "INGRÉDIENTS";
            recept.classList.add('recept');

            paragraph_recette.innerText = data.description;
            paragraph_recette.classList.add('paragraph_recette');

            const arrayIngredients = [];
            const arrayQuantity = [];


          
            
            ingredients = arrayIngredients;
            quantityUnit = arrayQuantity;
            console.log(ingredients);
            console.log(quantityUnit)

            galerieDisplay.appendChild(myDiv);
            myDiv.appendChild(image);
            myDiv.appendChild(titleRecept);
            myDiv.appendChild(title);
            myDiv.appendChild(paragraph_recette);
            myDiv.appendChild(recept);

            for (let i = 0; i < data.ingredients.length; i++) {
                
                const divIngredient = document.createElement('div');
                const underDivIngredient = document.createElement('div');
                const ingredient = document.createElement('h3');
                const quantity = document.createElement('p');
                const unit = document.createElement('p');

                mainGridElement.classList.add('main_grid_element');
                divIngredient.classList.add('div_ingredient');
                ingredient.classList.add('ingredient');
                underDivIngredient.classList.add('quantity_and_unit');

                ingredient.innerText = data.ingredients[i].ingredient;
                quantity.innerText = data.ingredients[i].quantity ? data.ingredients[i].quantity : "";

                
                unit.innerText = data.ingredients[i].unit ? data.ingredients[i].unit : "";

                mainGridElement.appendChild(divIngredient);
                divIngredient.appendChild(ingredient);
                divIngredient.appendChild(underDivIngredient);
                underDivIngredient.appendChild(quantity)
                underDivIngredient.appendChild(unit);

                myDiv.appendChild(mainGridElement);
                /*myDiv.appendChild(underDivIngredient);*/
            }

        } else {
            console.log('galerieDisplay est introuvable')
        }
   } catch (error) {
        console.error('impossible d\accéder à la partie gallerie de la page d\'acceuil', error);
   }

}


