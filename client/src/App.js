//@flow
import React, { Component } from 'react';
import './App.css';
import ReactAudioPlayer from 'react-audio-player';

// import artistData from './db/artistData';
// import albumData from './db/albumData';
// import trackData from './db/trackData';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MusicDisplay from './components/MusicDisplay';
import trackData from './db/trackData';

type Props = {};
type State = {};

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Sidebar />
          <MusicDisplay />
        </main>
        <ReactAudioPlayer
          src="/files/test.mp3"
          controls
        />
      </div>
    );
  }
}

export default App;
