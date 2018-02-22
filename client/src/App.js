//@flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import artistData from './db/artistData';
// import albumData from './db/albumData';
// import songData from './db/songData';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

type Props = {};
type State = {};

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Sidebar />
        </main>
      </div>
    );
  }
}

export default App;
