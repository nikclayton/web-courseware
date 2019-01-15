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
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fas fa-trash';
  deleteButton.appendChild(trashIcon);
  //deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

  deleteButton.addEventListener('click', function (event) {
    listItem.remove();

    document.querySelector('button#clear').disabled =
        document.querySelectorAll('li').length === 0;
  });

  listItem.appendChild(listText);
  listItem.appendChild(deleteButton);

  return listItem;
}

/**
 * Set up event listeners and configure initial element state when the
 * DOM is ready.
 */
function domContentLoaded() {
  const inputBox = document.getElementById('item');
  const shoppingList = document.querySelector('ul');
  const addItemButton = document.querySelector('button#append');
  const clearListButton = document.querySelector('button#clear');

  addItemButton.addEventListener('click', function (event) {
    const trimmedValue = inputBox.value.trim();

    if (trimmedValue === '') {
      return;
    }

    shoppingList.appendChild(createNewListItem(trimmedValue));
    inputBox.value = '';
    addItemButton.disabled = true;
    clearListButton.disabled = false;
    inputBox.focus();
  });

  inputBox.addEventListener('keyup', function (event) {
    const trimmedValue = inputBox.value.trim();
    addItemButton.disabled = trimmedValue === '';

    if (trimmedValue === '') {
      return;
    }

    if (event.key !== 'Enter') {
      return;
    }

    shoppingList.appendChild(createNewListItem(trimmedValue));
    inputBox.value = '';
    addItemButton.disabled = true;
    clearListButton.disabled = false;
  });

  clearListButton.addEventListener('click', function (event) {
    const listItems = document.querySelectorAll('li');
    listItems.forEach(function (element) {
      element.remove();
    });
    clearListButton.disabled = true;
  });

  inputBox.focus();
  clearListButton.disabled = true;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function (event) {
    domContentLoaded();
  });
} else {
  domContentLoaded();
}
