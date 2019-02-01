/**
 * Represents an item in the shopping list.
 *
 * @param name {string} Name of the item
 * @param quantity {string} Quantity of the item
 * @constructor
 */
function ShoppingListItem(name, quantity) {
  this.name = name;
  this.quantity = quantity;
}

/**
 * Creates and returns an 'li' element for inclusion in the shopping list.
 *
 * @returns {HTMLElement} li element
 */
ShoppingListItem.prototype.toListItem = function() {
  const listItem = document.createElement('li');

  const listText = document.createElement('span');
  listText.textContent = this.name;

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

  if (this.quantity !== '') {
    listItem.appendChild(document.createTextNode(' '));
    const quantityText = document.createElement('span');
    quantityText.textContent = `(${this.quantity})`;
    listItem.appendChild(quantityText);
  }

  listItem.appendChild(deleteButton);

  return listItem;
};


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

    const item = new ShoppingListItem(trimmedValue, quantityBox.value);

    shoppingList.appendChild(item.asListItem());
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

    const item = new ShoppingListItem(trimmedValue, quantityBox.value);

    shoppingList.appendChild(item.asListItem());
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
