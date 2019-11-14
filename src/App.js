import React, { Component } from 'react';
import './App.css';
import {Message} from './Components/Message.js';
import {Login} from './Components/Login.js';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Login />
            <Message />
        </div>
    );
  }
}

export default App;
