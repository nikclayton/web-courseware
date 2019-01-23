/**
 * Represents an item in the shopping list.
 */
class ShoppingListItem {
  /**
   * @param {string} name Name of the item
   * @param {string} quantity Quantity of the item
   */
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  /**
   * Creates and returns an 'li' element for inclusion in the shopping list.
   * @returns {HTMLElement} li element
   */
  toListItem() {
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

    if (this.quantity) {
      listItem.appendChild(document.createTextNode(' '));
      const quantityText = document.createElement('span');
      quantityText.textContent = `(${this.quantity})`;
      listItem.appendChild(quantityText);
    }

    listItem.appendChild(deleteButton);

    return listItem;
  }

  /**
   * String representation of a ShoppingListItem.
   * @returns {string}
   */
  toString() {
    return `${this.name} ({$this.quantity})`;
  }
}

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

    shoppingList.appendChild(
        new ShoppingListItem(trimmedValue, quantityBox.value).toListItem());

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

    shoppingList.appendChild(
        new ShoppingListItem(trimmedValue, quantityBox.value).toListItem());

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
