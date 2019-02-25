import React, {Component} from 'react';

class ItemInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      quantity: ''
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onAddItem() {
    this.props.onAddItem(this.state.item, this.state.quantity);
    this.setState({item: '', name: ''});
  }

  onItemChange(event) {
    this.setState({item: event.target.value.trim()});
  }

  onQuantityChange(event) {
    this.setState({quantity: event.target.value.trim()});
  }

  onKeyUp(event) {
    if (this.state.item === '') {
      return;
    }

    if (event.key !== 'Enter') {
      return;
    }

    this.onAddItem();
  }

  render() {
    return (
      <div>
        <label htmlFor="item">Enter a new item:</label>
        <input onChange={this.onQuantityChange}
               onKeyUp={this.onKeyUp}
               value={this.state.quantity}
               type="text" ref="quantity" size="8" placeholder="quantity"/>
        <input onChange={this.onItemChange}
               onKeyUp={this.onKeyUp}
               value={this.state.item}
               type="text" ref="item" placeholder="Type something to buy" />
        <button
          onClick={this.onAddItem}
          disabled={this.state.item === ''}
          id="add">Add item</button>
      </div>
    );
  }
}

export default ItemInput;
