/**
 * Shopping list model.
 *
 * The list is modelled as an array.
 */
class Model {
  /** @param controller {!Controller} App controller*/
  constructor(controller) {
    /** @private {!ShoppingListItem[]} Items in the list */
    this.items_ = [
        new ShoppingListItem('First item', 'q1'),
        new ShoppingListItem('Second item', 'q2'),
        new ShoppingListItem('Third item', 'q3')
    ];

    /** @private {!View} View for this model. */
    this.view_ = new View(this, controller);

    this.view_.update(this.items_.slice());
  }
}
