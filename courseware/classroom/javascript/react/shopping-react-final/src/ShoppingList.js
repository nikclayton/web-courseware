import React, {Component} from 'react';

class ShoppingList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => <li key={index}>{item}
          <button onClick={() => this.props.onDeleteItem(index)}>Delete</button> </li>)}
      </ul>
    );
  }
}

export default ShoppingList;
