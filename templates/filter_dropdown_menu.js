
const createFilter = (data, number) => {
/*console.log(data, number);*/
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

            crossFilterList.addEventListener('click', (e) => {
                clickToEraseTags(e);
            
            })

            break;

        case "2":
            searchDropDownList = document.querySelector('.switch2');

            crossFilterList.addEventListener('click', (e) => {
                clickToEraseTags(e);
            
            })

            break;

        case "3":
            searchDropDownList = document.querySelector('.switch3');

            crossFilterList.addEventListener('click', (e) => {
                clickToEraseTags(e);
            
            })

            break;

        case "4": searchDropDownList = document.querySelector('.tag_list_element');

            searchDropDownList.appendChild(divFilterList);
            divFilterList.appendChild(filterList);
            divFilterList.appendChild(crossFilterList);
            crossFilterList.classList.remove('cross_filter_list');
            crossFilterList.classList.add('cross_filter_list_tags');
            divFilterList.classList.add('tag_filter_list');
            divFilterList.classList.remove('div_filter_list');

            crossFilterList.addEventListener('click', (e) => {
              
                const parentNode = (e.target.parentNode)
                const nameFilter = parentNode.querySelector('.list_element').innerText 

                parentNode.remove()

                const allElement = document.querySelectorAll('.div_filter_list') 

                    allElement.forEach((elem) => {

                        if(elem.innerText == nameFilter) {

                            elem.classList.remove('yellow_cross');
                            const crossToErase = elem.querySelector('.cross_filter_list');
                            crossToErase.style.display = "none";
                        }
                    })
                
            })

            break;

        default :
        break;
    }

    if (number === "1" || number === "2" || number === "3") {

        const listFiltered = searchDropDownList.nextElementSibling.querySelector('.list_filter');

        listFiltered.appendChild(divFilterList);
        divFilterList.appendChild(filterList);
        divFilterList.appendChild(crossFilterList);
        
        handleSelection();
    }
}