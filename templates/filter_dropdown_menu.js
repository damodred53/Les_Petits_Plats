
const createFilter = (data, number) => {
console.log(data, number);
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

        case "3":
            searchDropDownList = document.querySelector('.switch3');
            break;

        case "4": searchDropDownList = document.querySelector('.tag_list_element');

            searchDropDownList.appendChild(divFilterList);
            divFilterList.appendChild(filterList);
            divFilterList.appendChild(crossFilterList);
            divFilterList.classList.add('tag_filter_list');
            divFilterList.classList.remove('div_filter_list');
            break;

        default :
        break;
    }

    if (number === "1" || number === "2" || number === "3") {

        const listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');
        /*if (!listFiltered) {
            const listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');
        }*/
        listFiltered.appendChild(divFilterList);
        divFilterList.appendChild(filterList);
        divFilterList.appendChild(crossFilterList);
        
        handleSelection();
    }
}