/**
 * Controller for the shopping list application.
 */
class Controller {
  constructor() {
    /** @private {!View} Application view */
    this.view_ = new View(this);

    /** @private {!Model} Application model */
    this.model_ = new Model(this);
  }

  /**
   * Add an item to the shopping list.
   *
   * @param name {string} Name of the item to add, may not be empty
   * @param quantity {string} The quantity of the item to add, may be empty
   */
  addItem(name, quantity) {
    const item = new ShoppingListItem(name, quantity);
    this.model_.append(item);
  }
}