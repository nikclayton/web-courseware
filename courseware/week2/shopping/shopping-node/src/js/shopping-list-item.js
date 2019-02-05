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
   * @returns {!HTMLElement} li element
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

    listItem.appendChild(document.createTextNode(' '));

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