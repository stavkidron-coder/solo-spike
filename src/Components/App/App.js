import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './App.css';

const SortableItem = SortableElement(({value}) => <p className="item">{value}</p>);

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="listContainer">
      {items.map((value, index) => (
        <SortableItem className="item" key={`item-${value}`} index={index} value={value} />
      ))}
    </div>
  );
});

class App extends Component {

  state = {
    items: ['one', 'two', 'three', 'four', 'five', 'six'],
  };
  
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    return(
      <div className="App">

        <h1>Drag and Drop</h1>
      
        <SortableList
          items={this.state.items}
          onSortEnd={this.onSortEnd}
        />

      </div>
    )
  }
}

render(<App />, document.getElementById('root'));

export default App;
