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

//capture input before hitting send so it doesn't affect the state
let newItem = '';

class App extends Component {

  // Dummy data
  state = {
    items: ['one', 'two', 'three', 'four', 'five', 'six'],
  };

  handleChange = (event) => {
    // this.setState({items: [event.target.value]})
    newItem = event.target.value;
    console.log('newItem', newItem);
  }

  submitBtn = () => {
    this.setState(previousState => ({
          items: [...previousState.items, newItem]
      }));
      this.itemInput.value = ""; // targets the specific input field and empties it
    }
  
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    return(
      <div className="App">

        <h1>Drag and Drop</h1>

        <h3>Add an item</h3>
        <input
          ref={(ref) => this.itemInput = ref} //empties input field without modifying the state
          placeholder="Add a new item here"
          onChange={this.handleChange}  
        />
        <button onClick={this.submitBtn}>Add</button>

        <h3>Click on a container and drag it to a new position on the list</h3>
      
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
