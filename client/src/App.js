//@flow
import React, { Component } from 'react';
import './App.css';
import AudioPlayer from 'react-h5-audio-player';

// import artistData from './db/artistData';
// import albumData from './db/albumData';
// import songData from './db/songData';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MusicDisplay from './components/MusicDisplay';

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
        <AudioPlayer
          src="my_audio_file.ogg"
          autoPlay
          controls
        />
      </div>
    );
  }
}

export default App;
