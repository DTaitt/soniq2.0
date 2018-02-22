//@flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import artistData from './db/artistData';
// import albumData from './db/albumData';
// import songData from './db/songData';
import Header from './components/Header';


type Props = {};
type State = {};

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
