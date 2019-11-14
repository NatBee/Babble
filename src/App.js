import React, { Component } from 'react';
import './App.css';
import {Message} from './Components/Message.js';
import {Nav} from './Components/Nav.js';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Nav />
            <Message/>
        </div>
    );
  }
}

export default App;
