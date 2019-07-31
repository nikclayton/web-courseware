/**
 * Creates and returns an 'li' element for inclusion in the shopping list.
 *
 * @param {string} itemName Name of the item to append to the list
 * @returns {HTMLElement} li element
 */
function createNewListItem(itemName) {
  let listItem = document.createElement('li');

  let listText = document.createElement('span');
  listText.textContent = itemName;

  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', function(event) {
    listItem.remove();
  });

  listItem.appendChild(listText);
  listItem.appendChild(deleteButton);

  return listItem;
}

let inputBox = document.getElementById('item');
let shoppingList = document.querySelector('ul');
let addItemButton = document.querySelector('button');

addItemButton.addEventListener('click', function(event) {
  if (inputBox.value.trim() !== '') {
    shoppingList.appendChild(createNewListItem(inputBox.value.trim()));
    inputBox.value = '';
    addItemButton.disabled = true;
  }
  inputBox.focus();
});

inputBox.addEventListener('keyup', function(event) {
  if (inputBox.value.trim() !== '') {
    addItemButton.disabled = false;
    if (event.key === 'Enter') {
      shoppingList.appendChild(createNewListItem(inputBox.value.trim()));
      inputBox.value = '';
    }
  }

  if (inputBox.value.trim() === '') {
    addItemButton.disabled = true;
  }
});

inputBox.focus();
