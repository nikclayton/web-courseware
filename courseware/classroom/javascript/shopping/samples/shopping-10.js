/**
 * Creates and returns an 'li' element for inclusion in the shopping list.
 *
 * @param {string} itemName Name of the item to append to the list
 * @returns {HTMLElement} li element
 */
function createNewListItem(itemName) {
  const listItem = document.createElement('li');

  const listText = document.createElement('span');
  listText.textContent = itemName;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', function(event) {
    listItem.remove();
  });

  listItem.appendChild(listText);
  listItem.appendChild(deleteButton);

  return listItem;
}

document.addEventListener('DOMContentLoaded', function(event) {
  const inputBox = document.getElementById('item');
  const shoppingList = document.querySelector('ul');
  const addItemButton = document.querySelector('button');

  document.querySelector('button').addEventListener('click', function(event) {
    if (inputBox.value.trim() !== '') {
      shoppingList.appendChild(createNewListItem(inputBox.value.trim()));
      inputBox.value = '';
      addItemButton.disabled = true;
    }
    inputBox.focus();
  });

  document.querySelector('input').addEventListener('keyup', function(event) {
    const trimmedValue = inputBox.value.trim();

    if (trimmedValue !== '') {
      addItemButton.disabled = trimmedValue === '';
      if (event.key === 'Enter') {
        shoppingList.appendChild(createNewListItem(trimmedValue));
        inputBox.value = '';
      }
    }

    if (trimmedValue === '') {
      addItemButton.disabled = trimmedValue === '';
    }
  });

  inputBox.focus();
});
