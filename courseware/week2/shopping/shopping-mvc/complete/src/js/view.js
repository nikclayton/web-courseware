/**
 * HTML View for the ShoppingList.
 */
class View {
  /**
   * @param model {Model} Data model
   * @param controller {Controller} App controller
   */
  constructor(model, controller) {
    this.model = model;
    this.controller = controller;

    this.quantityBox = document.getElementById('quantity');
    this.inputBox = document.getElementById('item');
    this.shoppingList = document.querySelector('ul');
    this.addItemButton = document.querySelector('button#add');
    this.clearListButton = document.querySelector('button#clear');

    // Connect the event listeners
    this.addItemButton.addEventListener('click',
        () => this.controller.maybeAddItem(
            this.inputBox.value, this.quantityBox.value));
    this.inputBox.addEventListener('keyup',
        event => this.onInputKeyup(event));
    this.clearListButton.addEventListener('click',
        () => this.controller.clearList());
  }

  onInputKeyup(event) {
    const trimmedValue = this.inputBox.value.trim();
    this.addItemButton.disabled = trimmedValue === '';

    if (event.key !== 'Enter') {
      return;
    }

    this.controller.maybeAddItem(
        trimmedValue, this.quantityBox.value);
  }

  update() {
    while (this.shoppingList.firstChild) {
      this.shoppingList.firstChild.remove();
    }

    for (let i = 0; i < this.model.items.length; i++) {
      const item = this.model.items[i];
      const listItem = item.toListItem();

      const deleteButton = listItem.querySelector('button');
      deleteButton.addEventListener('click',
          () => this.controller.delete(i));

      this.shoppingList.appendChild(listItem);
    }

    this.inputBox.value = '';
    this.quantityBox.value = '';
    this.addItemButton.disabled = true;
    this.clearListButton.disabled = this.model.items.length === 0;
    this.quantityBox.focus();
  }
}
