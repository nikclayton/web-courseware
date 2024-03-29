/**
 * Shopping list model.
 *
 * The list is modelled as an array.
 */
class Model {
  /** @param controller {!Controller} App controller*/
  constructor(controller) {
    /** @private {!ShoppingListItem[]} Items in the list */
    this.items_ = [];

    /** @private {!View} View for this model. */
    this.view_ = new View(this, controller);

    this.view_.update();
  }

  /**
   * Appends a new item to the list.
   *
   * @param item {!ShoppingListItem}
   */
  append(item) {
    this.items_.push(item);
    this.view_.update(this.items_.slice());
  }
}
