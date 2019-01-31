/**
 * Shopping list model.
 *
 * The list is modelled as an array.
 */
class Model {
  /** @param controller {Controller} */
  constructor(controller) {
    /** @private {!Array<!ShoppingListItem>} Items in the list */
    this.items_ = [];

    /** {!View} View for this model. */
    this.view_ = new View(this, controller);
  }
}