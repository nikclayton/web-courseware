/**
 * Shopping list model.
 *
 * The list is modelled as an array.
 */
class Model {
  /** @param view {!View} App view */
  constructor(view) {
    console.log('Model initialised');

    /** @private {!ShoppingListItem[]} Items in the list */
    this.items_ = [];

    /** @private {!View} View for this model. */
    this.view_ = view;
  }
}
