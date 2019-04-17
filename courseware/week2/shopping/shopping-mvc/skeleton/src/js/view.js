/** HTML View for the ShoppingList. */
class View {
  /**
   * @param controller {!Controller} App controller
   */
  constructor(model, controller) {
    console.log('View ready!');

    /** @private {!Controller} App controller */
    this.controller_ = controller;
  }
}
