const createFilter = (data, number) => {
    const divFilterList = document.createElement('div');
    const crossFilterList = document.createElement('img')
    const filterList = document.createElement('li');

    divFilterList.classList.add('div_filter_list');
    crossFilterList.classList.add('cross_filter_list');
    crossFilterList.src = '../assets/cross.svg';
    filterList.innerText = data;
    filterList.classList.add('list_element');

    let searchDropDownList;
    let listFiltered;

    switch (number) {
        case "1":
            searchDropDownList = document.querySelector('.switch1');
            listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');

            listFiltered.appendChild(divFilterList);
            divFilterList.appendChild(filterList);
            divFilterList.appendChild(crossFilterList);

            handleSelection();

            divFilterList.addEventListener('click', (e) => {
                const filterSelected = e.target.innerText;
                searchAllDisplayedRecipes(filterSelected);
            });

            crossFilterList.addEventListener('click', (e) => {
                clickToEraseTags(e);
                clickToEraseDataSelectedFilter(e);
                searchAllDisplayedRecipes(filterSelected);
            });

            break;

        case "2":
            searchDropDownList = document.querySelector('.switch2');
            listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');

            listFiltered.appendChild(divFilterList);
            divFilterList.appendChild(filterList);
            divFilterList.appendChild(crossFilterList);

            handleSelection();

            divFilterList.addEventListener('click', (e) => {
                const filterSelected = e.target.innerText;
                searchAllDisplayedRecipes(filterSelected);
            });

            crossFilterList.addEventListener('click', (e) => {
                clickToEraseTags(e);
                clickToEraseDataSelectedFilter(e);
                searchAllDisplayedRecipes(filterSelected);
            });

            break;

        case "3":
            searchDropDownList = document.querySelector('.switch3');
            listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');

            listFiltered.appendChild(divFilterList);
            divFilterList.appendChild(filterList);
            divFilterList.appendChild(crossFilterList);

            handleSelection();

            divFilterList.addEventListener('click', (e) => {
                const filterSelected = e.target.innerText;
                searchAllDisplayedRecipes(filterSelected);
            });

            crossFilterList.addEventListener('click', (e) => {
                clickToEraseTags(e);
                clickToEraseDataSelectedFilter(e);
                searchAllDisplayedRecipes(filterSelected);
            });

            break;

        case "4":
            searchDropDownList = document.querySelector('.tag_list_element');
            searchDropDownList.appendChild(divFilterList);
            divFilterList.appendChild(filterList);
            divFilterList.appendChild(crossFilterList);
            crossFilterList.classList.remove('cross_filter_list');
            crossFilterList.classList.add('cross_filter_list_tags');
            divFilterList.classList.add('tag_filter_list');
            divFilterList.classList.remove('div_filter_list');
            filterList.classList.add('displayed_tags');

            crossFilterList.addEventListener('click', (e) => {
                erasureFromFilterList(e);

                // On vide l'affichage des recettes avant affichées
                const test = document.querySelectorAll('.grille_display');
                if (test) {
                    test.forEach((element) => {
                        element.remove();
                    });
                }

                if (dataSelected.length === 0) {
                    fetchRecipes();
                } else {
                    searchAllDisplayedRecipes();
                }
            });

            break;

        default:
            break;
    }

    /*if (number === "1" || number === "2" || number === "3") {
        const listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');
        listFiltered.appendChild(divFilterList);
        divFilterList.appendChild(filterList);
        divFilterList.appendChild(crossFilterList);
        handleSelection();
    }*/
};
