import React, {Component} from 'react';
import './App.css';
import ItemInput from './ItemInput';
import ClearList from './ClearList';
import ShoppingList from './ShoppingList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onClearList = this.onClearList.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onAddItem(name, quantity) {
    let item = name;
    if (quantity !== '') {
      item = item + ` (${quantity})`;
    }
    this.setState({items: [...this.state.items, item]});
  }

  onClearList() {
    this.setState({items: []});
  }

  onDeleteItem(index) {
    this.state.items.splice(index, 1);
    this.setState({items: this.state.items});
  }

  render() {
    return (
      <>
        <ItemInput onAddItem={this.onAddItem}/>
        <ClearList onClearList={this.onClearList}
                   disabled={this.state.items.length === 0}/>
        <ShoppingList items={this.state.items}
                      onDeleteItem={this.onDeleteItem}/>
      </>
    );
  }
}

export default App;
