import React, {Component} from 'react';

class ClearList extends Component {
  render() {
    return (
      <button id="clear-list"
              disabled={this.props.disabled}
              onClick={this.props.onClearList}>Clear list</button>
    )
  }
}

export default ClearList;
