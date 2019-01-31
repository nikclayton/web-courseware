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
    /** {!Array<!ShoppingListItem>} Items in the list */
    this.items_ = [];

    /** {!View} View for this model. */
    this.view = new View(this, controller);
  }

  /**
   * @returns {!ShoppingListItem[]} Read-only array of items
   */
  get items() {
    return this.items_.slice();
  }

  /**
   * Appends a new item to the list.
   *
   * @param item {!ShoppingListItem}
   */
  append(item) {
    this.items_.push(item);
    this.view.update();
  }

  /**
   * Delete the i'th item from the list.
   *
   * @param i {number}
   */
  delete(i) {
    this.items_.splice(i, 1);
    this.view.update();
  }

  /**
   * Clear the shopping list of all items.
   */
  clear() {
    this.items_ = [];
    this.view.update();
  }
}
