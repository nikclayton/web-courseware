class ShoppingListItem {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  toListItem() {
    let li = document.createElement('li');
    let nameSpan = document.createElement('span');
    nameSpan.innerText = this.name;

    let quantitySpan = document.createElement('span');
    quantitySpan.innerText = '(' + this.quantity + ')';

    let button = document.createElement('button');
    button.innerText = 'Delete';

    li.appendChild(nameSpan);
    li.appendChild(document.createTextNode(' '));
    li.appendChild(quantitySpan);
    li.appendChild(button);

    return li;
  }

  toString() {
    return `${this.name} (${this.quantity})`;
  }
}