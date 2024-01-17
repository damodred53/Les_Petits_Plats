const searchDropDownList1 = document.querySelector('.switch1');
const searchDropDownList2 = document.querySelector('.switch2');
const searchDropDownList3 = document.querySelector('.switch3');

const addClickEvent = (element, callback) => {
    element.addEventListener('click', callback);
};

const addCrossClickEvent = (crossElement, callback) => {
    crossElement.addEventListener('click', callback);
};

const addFilterToList = (listFiltered, divFilterList, filterList, crossFilterList, clickCallback, crossClickCallback) => {
    listFiltered.appendChild(divFilterList);
    divFilterList.appendChild(filterList);
    divFilterList.appendChild(crossFilterList);

    /*handleSelection();*/

    addClickEvent(divFilterList, clickCallback);
    addCrossClickEvent(crossFilterList, crossClickCallback);
};

const createFilter = (data, number) => {
    const divFilterList = document.createElement('div');
    const crossFilterList = document.createElement('img');
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
            listFiltered = searchDropDownList1.nextElementSibling.querySelector('.list_filter');
            addFilterToList(listFiltered, divFilterList, filterList, crossFilterList, (e) => {
                const filterSelected = e.target.innerText;
                searchAllDisplayedRecipes(filterSelected);
            }, (e) => {
                clickToEraseTags(e);
                clickToEraseDataSelectedFilter(e);
                searchAllDisplayedRecipes(filterSelected);
            });
            break;

        case "2":
            listFiltered = searchDropDownList2.nextElementSibling.querySelector('.list_filter');
            addFilterToList(listFiltered, divFilterList, filterList, crossFilterList, (e) => {
                const filterSelected = e.target.innerText;
                searchAllDisplayedRecipes(filterSelected);
            }, (e) => {
                clickToEraseTags(e);
                clickToEraseDataSelectedFilter(e);
                searchAllDisplayedRecipes(filterSelected);
            });
            break;

        case "3":
            listFiltered = searchDropDownList3.nextElementSibling.querySelector('.list_filter');
            addFilterToList(listFiltered, divFilterList, filterList, crossFilterList, (e) => {
                const filterSelected = e.target.innerText;
                searchAllDisplayedRecipes(filterSelected);
            }, (e) => {
                clickToEraseTags(e);
                clickToEraseDataSelectedFilter(e);
                searchAllDisplayedRecipes(filterSelected);
            });
            break;

        case "4":
            searchDropDownList = document.querySelector('.tag_list_element');
            addFilterToList(searchDropDownList, divFilterList, filterList, crossFilterList, (e) => {

            }, (e) => {
                erasureFromFilterList(e);

            });
            crossFilterList.classList.remove('cross_filter_list');
            crossFilterList.classList.add('cross_filter_list_tags');
            divFilterList.classList.add('tag_filter_list');
            divFilterList.classList.remove('div_filter_list');
            filterList.classList.add('displayed_tags');
            break;

        default:
            break;
    }
};
