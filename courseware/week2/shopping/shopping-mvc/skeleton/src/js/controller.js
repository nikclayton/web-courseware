/**
 * Controller for the shopping list application.
 */
class Controller {
  constructor() {
    console.log('Controller running!');

    /** @private {!View} Application view */
    this.view_ = new View(this);

    /** @private {!Model} Application model */
    this.model_ = new Model(this.view_);
  }
}
