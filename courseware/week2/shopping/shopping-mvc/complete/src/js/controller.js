/**
 * Controller for the shopping list application.
 */
class Controller {
  constructor() {
    this.model = new Model(this);
  }

  /**
   * Maybe add an item to the shopping list. The item's name must not be
   * the empty string for this to happen.
   *
   * @param name {string} Name of the item to add, may be empty
   * @param quantity {string} The quantity of the item to add
   */
  maybeAddItem(name, quantity) {
    const trimmedName = name.trim();

    if (trimmedName === '') {
      return;
    }

    const item = new ShoppingListItem(trimmedName, quantity);
    this.model.append(item);
  }

  /**
   * Delete the i'th item from the list.
   *
   * @param i {number}
   */
  delete(i) {
    this.model.delete(i);
  }

  /**
   * Clear the shopping list.
   */
  clearList() {
    this.model.clear();
  }
}
