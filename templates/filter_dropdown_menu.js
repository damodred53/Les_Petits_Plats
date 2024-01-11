
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

    switch (number) {
        case "1":
            searchDropDownList = document.querySelector('.switch1');
            break;

        case "2":
            searchDropDownList = document.querySelector('.switch2');
            break;

        default:
            searchDropDownList = document.querySelector('.switch3');
            break;
    }

    if (searchDropDownList) {

        const listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');
        listFiltered.appendChild(divFilterList);
        divFilterList.appendChild(filterList);
        divFilterList.appendChild(crossFilterList);
        
        handleSelection();
    }
}