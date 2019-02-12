React Neodux
============

React bindings for [Neodux][neodux].

## Installation

React-Neodux requires **React 16.8 or later**.

> npm install --save react-neodux

## Usage

React-Neodux provides simple bindings for both function based components (via
[hooks][hooks]) and for class based components via Render Props.


The following examples assume that you are familiar with how Neodux works. If
you are not, please read the [neodux][neodux] documentation before you begin.


### Hooks

This is the `store.js` module where the store is initiated. We expose two new functions: `useState` and `useAction`.
```javascript
import actions from 'neodux';
import './myActions';
import {useStore} from 'react-neodux';
const store = actions.createStore();
const {useState, useAction} = useStore(store);
export {useState, useAction};
```

In your `App.js` component (or whichever components needs data from the store):

```javascript
import React from 'react';
import {useState, useAction} from './store';

export function App = () => {
  const counter = useState('counter');
  const increment = useAction('increment');
  const decrement = useAction('decrement');

  return (
    <div className="app">
      <div>Counter {counter}</div>
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
}

```

### Class Components

This is the `store.js` module that instantiates the store and creates a **Connect** component.

```javascript
import actions from 'neodux';
import './myActions';
import {createConnect} from 'react-neodux';
const store = actions.createStore();
const connect = createConnect(store);
export default connect;
```

In your App.js class component, use the created connect component to retrieve values from the state tree.  
The "get" prop is the path to the value you want to retrieve. The render prop takes a render function and passes it two arguments: the first is the value at the specified path, the second is an object containing all of the registered actions on the store.

```javascript
import React, { Component } from 'react';
import Connect from './store';

class App extends Component {
  render() {
    return (
      <Connect get="counter" render={(counter, actions) => {
        const {increment, decrement} = actions;
        return (
          <div className="App">
            <div>Counter {counter}</div>
            <div>
              <button onClick={increment}>increment</button>
              <button onClick={decrement}>decrement</button>
            </div>
          </div>
        );
      }} />
    );
  }
}

```

[neodux]: https://github.com/neoduxjs/neodux
[hooks]: https://reactjs.org/docs/hooks-intro.html
