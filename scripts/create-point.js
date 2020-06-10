
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de Coleta

const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handSelectedItem(event) {
    const itemLi = event.target

// add or remove classes
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id 

    const alredySelected = selectedItems.findIndex(function(item) {
        const itemFound = item ==itemId
        return itemFound
    })




    //if selected, remove from selection 

if ( alredySelected >=0 ) {
        
    const filteredItems = selectedItems.filter ( item => {
        const itemDifferent = item != itemId
        return itemDifferent
    })

        selectedItems = filteredItems
} else {
    //if not selected, select
    selectedItems.push(itemId)
}

collectedItems.value = selectedItems

}