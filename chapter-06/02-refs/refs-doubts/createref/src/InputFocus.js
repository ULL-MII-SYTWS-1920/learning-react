/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

import React, { Component } from 'react';

export default class InputFocus extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }
  render() {
    return (
      <div>
        <input ref={this.myInput}/>

        <button onClick={() => {
          this.myInput.current.focus();
        }}>
          focus!
        </button>
      </div>
    );
  }
}

// export default App;
