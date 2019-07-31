/**
 * HTML View for the ShoppingList.
 */
class View {
  /**
   * @param model {Model} Data model
   * @param controller {Controller} App controller
   */
  constructor(model, controller) {
    this.model = model;
    this.controller = controller;

    this.shoppingList = document.querySelector('ul');
  }

  update() {
    for (let i = 0; i < this.model.items.length; i++) {
      const item = this.model.items[i];
      const listItem = item.toListItem();

      this.shoppingList.appendChild(listItem);
    }
  }
}

/**
 * Shopping list model.
 *
 * The list is modelled as an array, accessible through the .items property.
 * It should be treated as read-only.
 */
class Model {
  /**
   * @param controller
   */
  constructor(controller) {
    /** @private {!ShoppingListItem[]>} Items in the list */
    this.items_ = [
        new ShoppingListItem('First item', 'q1'),
        new ShoppingListItem('Second item', 'q2'),
        new ShoppingListItem('Third item', 'q3')
    ];

    /** {!View} View for this model. */
    this.view = new View(this, controller);
    this.view.update();
  }

  /**
   * @returns {ShoppingListItem[]} Read-only array of items
   */
  get items() {
    return this.items_.slice();
  }
}


class Controller {
  constructor() {
    this.model = new Model(this);
  }
}

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
   *
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
   *
   * @returns {string}
   */
  toString() {
    return `${this.name} (${this.quantity})`;
  }
}

/**
 * Create the controller to run the application.
 */
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
