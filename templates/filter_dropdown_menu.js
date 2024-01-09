
const createFilter = (data, number) => {
    
    const filterList = document.createElement('li');
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
        // Trouver la liste filtrée spécifique à switch2
        const listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');
        listFiltered.appendChild(filterList);
    }
}