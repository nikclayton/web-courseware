/**
 * HTML View for the ShoppingList.
 */
class View {
  /**
   * @param controller {!Controller} App controller
   */
  constructor(controller) {
    /** @private {!Controller} App controller */
    this.controller_ = controller;

    /** @private {!HTMLElement} Shopping list element */
    this.shoppingList_ = document.querySelector('ul');
  }

  /**
   * Update the UI with the shopping list contents.
   *
   * @param {!Array<string>} items Items to display
   */
  update(items) {
    while (this.shoppingList_.firstChild) {
      this.shoppingList_.firstChild.remove();
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const listItem = item.toListItem();
      this.shoppingList_.appendChild(listItem);
    }
  }
}
