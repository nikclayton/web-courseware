class View {
  constructor(controller, model) {
    this.model = model;
    this.controller = controller;

    this.quantityBox = document.getElementById('quantity');
    this.inputBox = document.getElementById('item');
    this.shoppingList = document.querySelector('ul');
    this.addItemButton = document.querySelector('button#add');
    this.clearListButton = document.querySelector('button#clear');

    // Hook up the event listeners
    this.addItemButton.addEventListener('click', () => this.onAddItemClick());
    this.inputBox.addEventListener('keyup', event => this.onInputKeyup(event));
    this.clearListButton.addEventListener('click', event => this.onClearListClick());
  }

  onAddItemClick() {
    const trimmedValue = this.inputBox.value.trim();

    if (trimmedValue === '') {
      return;
    }

    const item = new ShoppingListItem(trimmedValue, this.quantityBox.value);
    this.controller.add(item);
  }

  onInputKeyup(event) {
    const trimmedValue = this.inputBox.value.trim();
    this.addItemButton.disabled = trimmedValue === '';

    if (trimmedValue === '') {
      return;
    }

    if (event.key !== 'Enter') {
      return;
    }

    const item = new ShoppingListItem(trimmedValue, this.quantityBox.value);
    this.controller.add(item);
  }

  onClearListClick() {
    this.controller.clearList();
  }

  onDeleteItemClick(event, i) {
    this.controller.delete(i);
  }

  update() {
    while (this.shoppingList.firstChild) {
      this.shoppingList.firstChild.remove();
    }

    for (let i = 0; i < this.model.items.length; i++) {
      const item = this.model.items[i];
      const listItem = item.toListItem();

      const deleteButton = listItem.querySelector('button');
      deleteButton.addEventListener('click', (event) => this.onDeleteItemClick(event, i));

      this.shoppingList.appendChild(listItem);
    }

    this.inputBox.value = '';
    this.addItemButton.disabled = true;
    this.clearListButton.disabled = this.model.items.length === 0;
    this.quantityBox.focus();
  }
}

class Model {
  constructor() {
    this.items = [];
  }

  append(item) {
    this.items.push(item);
  }

  /**
   * Delete the i'th item.
   * @param i
   */
  delete(i) {
    this.items.splice(i, 1);
  }

  clear() {
    this.items = [];
  }
}


class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View(this, this.model);
    this.view.update();
  }

  add(item) {
    console.log('controller: append ' + item);
    this.model.append(item);
    this.view.update();
  }

  /**
   * Delete the i'th item from the list
   * @param i
   */
  delete(i) {
    this.model.delete(i);
    this.view.update();
  }

  clearList() {
    this.model.clear();
    this.view.update();
  }
}

class ShoppingListItem {
  /**
   * @param {string} name Name of the item to append to the list
   * @param {string} quantity Quantity of the item to append to the list
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
    return `${this.name} (${this.quantity})`;
  }
}

function domContentLoaded() {
  new Controller();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function (event) {
    domContentLoaded();
  });
} else {
  domContentLoaded();
}
