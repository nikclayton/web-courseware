/**
 * Controller for the shopping list application.
 */
class FatController {
  constructor() {
    this.items_ = [];

    this.view_ = new View(this);
  }

  /**
   * Add an item to the shopping list.
   *
   * @param name {string} Name of the item to add, may not be empty
   * @param quantity {string} The quantity of the item to add, may be empty
   */
  addItem(name, quantity) {
    const item = new ShoppingListItem(name, quantity);
    //this.model_.append(item);
    this.items_.push(item);
    this.view_.update(this.items_.slice());
  }

  /**
   * Delete the i'th item from the list.
   *
   * @param i {number}
   */
  deleteItem(i) {
    //this.model_.delete(i);
    this.items_.splice(i, 1);
    this.view_.update(this.items_.slice());
  }

  /**
   * Clear the shopping list.
   */
  clearList() {
    //this.model_.clear();
    this.items_ = [];
    this.view_.update(this.items_.slice());
  }
}