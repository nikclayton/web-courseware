/**
 * Creates and returns an 'li' element for inclusion in the shopping list.
 *
 * @param {string} itemName Name of the item to append to the list
 * @param {string} quantity Quantity of the item to append to the list
 * @returns {HTMLElement} li element
 */
function createNewListItem(itemName, quantity) {
  const listItem = document.createElement('li');

  const listText = document.createElement('span');
  listText.textContent = itemName;

  const deleteButton = document.createElement('button');
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fas fa-trash';
  deleteButton.appendChild(trashIcon);

  deleteButton.addEventListener('click', function (event) {
    listItem.remove();

    document.querySelector('#clear').disabled =
        document.querySelectorAll('li').length === 0;
  });

  listItem.appendChild(listText);

  if (quantity !== '') {
    listItem.appendChild(document.createTextNode(' '));
    const quantityText = document.createElement('span');
    quantityText.textContent = `(${quantity})`;
    listItem.appendChild(quantityText);
  }

  listItem.appendChild(deleteButton);

  return listItem;
}

/**
 * Set up event listeners and configure initial element state when the
 * DOM is ready.
 */
function domContentLoaded() {
  const quantityBox = document.getElementById('quantity');
  const inputBox = document.getElementById('item');
  const shoppingList = document.querySelector('ul');
  const addItemButton = document.querySelector('#add');
  const clearListButton = document.querySelector('#clear');

  addItemButton.addEventListener('click', function (event) {
    const trimmedValue = inputBox.value.trim();

    if (trimmedValue === '') {
      return;
    }

    shoppingList.appendChild(createNewListItem(trimmedValue,
        quantityBox.value.trim()));
    quantityBox.value = '';
    inputBox.value = '';
    addItemButton.disabled = true;
    clearListButton.disabled = false;
    quantityBox.focus();
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

    shoppingList.appendChild(createNewListItem(trimmedValue,
        quantityBox.value.trim()));
    inputBox.value = '';
    clearListButton.disabled = false;
    quantityBox.value = '';
    quantityBox.focus();
  });

  clearListButton.addEventListener('click', function (event) {
    const listItems = document.querySelectorAll('li');
    listItems.forEach(function (element) {
      element.remove();
    });
    clearListButton.disabled = true;
  });

  quantityBox.focus();
  clearListButton.disabled = true;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function (event) {
    domContentLoaded();
  });
} else {
  domContentLoaded();
}
