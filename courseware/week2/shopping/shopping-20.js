/**
 * Creates and returns an 'li' element for inclusion in the shopping list.
 *
 * @param {{name: string, quantity: string}} item Item to append to the list
 * @returns {HTMLElement} li element
 */
function createNewListItem(item) {
  const listItem = document.createElement('li');

  const listText = document.createElement('span');
  listText.textContent = item.name;

  const deleteButton = document.createElement('button');
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fas fa-trash';
  deleteButton.appendChild(trashIcon);

  deleteButton.addEventListener('click', function (event) {
    listItem.remove();

    document.querySelector('button#clear').disabled =
        document.querySelectorAll('li').length === 0;
  });

  listItem.appendChild(listText);

  if (item.quantity !== '') {
    listItem.appendChild(document.createTextNode(' '));
    const quantityText = document.createElement('span');
    quantityText.textContent = '(' + item.quantity + ')';
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
  const addItemButton = document.querySelector('button#append');
  const clearListButton = document.querySelector('button#clear');

  addItemButton.addEventListener('click', function (event) {
    const trimmedValue = inputBox.value.trim();

    if (trimmedValue === '') {
      return;
    }

    const item = {
      name: trimmedValue,
      quantity: quantityBox.value
    };

    shoppingList.appendChild(createNewListItem(item));
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

    const item = {
      name: trimmedValue,
      quantity: quantityBox.value
    };

    shoppingList.appendChild(createNewListItem(item));
    inputBox.value = '';
    addItemButton.disabled = true;
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
