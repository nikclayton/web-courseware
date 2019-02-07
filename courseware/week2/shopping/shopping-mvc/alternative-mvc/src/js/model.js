/**
 * Shopping list model.
 *
 * The list is modelled as an array.
 */
class Model {
  /** @param views {!View[]} App controller*/
  constructor(views) {
    /** @private {!ShoppingListItem[]} Items in the list */
    this.items_ = [];

    /** @private {!View[]} View for this model. */
    this.views_ = views;

    this.views_.forEach((view) => view.update(this.items_.slice()));
  }

  /**
   * Appends a new item to the list.
   *
   * @param item {!ShoppingListItem}
   */
  append(item) {
    this.items_.push(item);
    this.views_.forEach((view) => view.update(this.items_.slice()));
  }

  /**
   * Delete the i'th item from the list.
   *
   * @param i {number}
   */
  delete(i) {
    this.items_.splice(i, 1);
    this.views_.forEach((view) => view.update(this.items_.slice()));
  }

  /**
   * Clear the shopping list of all items.
   */
  clear() {
    this.items_ = [];
    this.views_.forEach((view) => view.update(this.items_.slice()));
  }
}