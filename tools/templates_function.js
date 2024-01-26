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
            testAddClass(e);
        }, 150);
        }
        
    } else {
        console.log("L'élément n'a pas été trouvé dans le tableau.");
    }
}

const erasureFromFilterList = (e) => {

    // suppression du tag en lui-même
    
        const parentNode = (e.target.parentNode)
    
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
    
            } else {
                console.log("L'élément n'a pas été trouvé dans le tableau.");
            }
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

/**
 * fonction permettant l'ajout d'un cadre jaune sur les filtres actifs dans les menus déroulants
 */
const testAddClass = () => {
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
                    }
                })
} 