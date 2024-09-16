
list = document.querySelector("#list");
addItemButton = document.querySelector("#addItem");
listItemTextBox = document.querySelector("#listItem");
clearListButton = document.querySelector("#clearList");
let listItemArray = [];

/**
 * This method creates a list html element with a text node(The created text node has the value of the variable 'listItem').
 * This list element is then added to the unordered list and the array 'listItemArray'.
 * If this method is being called after listItems from local storage are loaded, 
 * it will add the text value of the list item to local storage.  
 * 
 * @param {Value from the text box} listItem 
 * @param {Is this method being called to load list items that exist in local storage?} loadingFromLocalStorage 
 */
const addListItem = function (listItem, loadingFromLocalStorage) {
    li = document.createElement("li");
    li.appendChild(document.createTextNode(listItem));
    list.appendChild(li);
    listItemArray.push(li);
    addListItemButtons(li);
    li.addEventListener("click", ()=>{
        li.classList.toggle("strikethough")
    })
    if (!loadingFromLocalStorage) {
        addListItemToStorage(li.firstChild)
    }
}

const addListItemButtons = function (li){
    editButton = document.createElement("input")
    editButton.type = "button"
    editButton.value = "Edit"
    li.appendChild(editButton)
    editButton.addEventListener("click", () =>{
        changes = prompt("Enter the changes you would like to make to this item\n" + li.firstChild.textContent, li.firstChild.textContent);
        if(changes != null){
            key = getStorageValueKey(li.firstChild.textContent);
            li.firstChild.textContent = changes;
            localStorage.setItem(key, changes)
        }
    })
    deleteButton = document.createElement("input");
    deleteButton.type = "button"
    deleteButton.value = "Delete"
    li.appendChild(deleteButton);
    deleteButton.addEventListener("click", () =>{
        if(confirm("Are you sure you want to delete the item\n\"" + li.firstChild.textContent + "\"?") == true){
            key = getStorageValueKey(li.firstChild.textContent);
            listItemArray[key].remove();
            listItemArray.splice(key,1);
            removeListItemFromStorage(key)
        }
    })
}

const getListItemsAsString = function () {
    let message = "";
    for (let index = 0; index < listItemArray.length; index++) {
        message += (index + 1) + ")" + listItemArray[index].textContent + "\n";
    }
    return message;
}

const getListItemValue = function () {
    let listItem = document.querySelector("#listItem").value;
    return listItem;
}

const getStorageValueKey = function(textValue){
    for(let index = 0; index < listItemArray.length; index++){
        if(textValue == listItemArray[index].textContent){
            return index;
        }
    }
    return null;
}

const changeListItemInStorage = function (text){
    localStorage.getItem()
}
const addListItemToStorage = function (listItemTextNode) {
    localStorage.setItem(listItemArray.length - 1, listItemTextNode.textContent);
    if (listItemArray.length != null) {
        addListSizeToStorage()
    }
}

const removeListItemFromStorage = function (localStorageKey) {
    localStorage.removeItem(localStorageKey)
    
    addListSizeToStorage()
    
    for(let index = localStorageKey; index <= localStorage.getItem("size"); index ++){
        localStorage.setItem(index, localStorage.getItem(index + 1));
    }
}

const addListSizeToStorage = function () {
    localStorage.setItem("size", listItemArray.length - 1)
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("size") != null) {
         for (let index = 0; index <= localStorage.getItem("size"); index++) {
            
             addListItem(localStorage.getItem(index), true);
             console.log(localStorage.getItem(index))
        }
    }

    addItemButton.addEventListener("click", () => {addListItem(getListItemValue(), false); listItem.value = "";});
    listItemTextBox.addEventListener("keydown", () => { if (event.key == 'Enter') { addListItem(getListItemValue(), false); listItem.value = ""; } })
    clearListButton.addEventListener("click", () => {
        if (window.confirm("This action will delete all list entries. Are you sure you want to continue?") == true) {
            localStorage.clear();
            for (let index = 0; index < listItemArray.length; index++) {
                listItemArray[index].remove();
                console.log(listItemArray.length)
            }
            listItemArray.splice(0);
            console.log(listItemArray.length)
        }

    })
})

window.addEventListener("beforeunload", () => {

});


