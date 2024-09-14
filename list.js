
list = document.querySelector("#list");
addItemButton = document.querySelector("#addItem");
listItemTextBox = document.querySelector("#listItem");
removeItemButton = document.querySelector("#removeItem");
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
    if (!loadingFromLocalStorage) {
        addListItemToStorage(li.firstChild)
    }
}

/**
 * This method prompts the user to select a list element to be removed.
 */
const removeListItem = function () {
    if (listItemArray.length == 0) {
        alert("you must enter a list item before you can remove one")
    } else {
        let message = getListItemsAsString();

        let input = -1;

        while (input < 0 || input > listItemArray.length || isNaN(input)) {
            input = parseInt(window.prompt("Enter the number that corresponds to the Item you wish to delete. type 0 to close this window\n" + message, "0"))
            console.log(input)
            if (input < 0 || input > listItemArray.length || isNaN(input)) {
                alert("please enter a valid number")
                input = -1
            }
        }
        if (input > 0 && input <= listItemArray.length) {
            listItemArray[input - 1].remove();
            listItemArray.splice(input - 1, 1);
            removeListItemFromStorage(input - 1)
            input--;
        }
    }
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
    removeItemButton.addEventListener("click", removeListItem);
    listItemTextBox.addEventListener("keydown", () => { if (event.key == 'Enter') { addListItem(getListItemValue(), false); listItem.value = ""; } })
    listItemTextBox.addEventListener("keydown", () => { if (event.key == 'Delete') { removeListItem() } })
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


