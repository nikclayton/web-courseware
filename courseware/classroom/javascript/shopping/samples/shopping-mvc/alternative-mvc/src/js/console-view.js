class ConsoleView {
  constructor(controller) {

  }

  /**
   *
   * @param items {!ShoppingListItem[]}
   */
  update2(items) {
    if (items.length === 0) {
      console.log('There are no items in the list, please buy something!');
      return;
    }

    console.log('The current list is:');
    items.forEach(function(item) {
      console.log(item.toString());
    })
  }
}