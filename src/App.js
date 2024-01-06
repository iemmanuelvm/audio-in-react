import logo from './logo.svg';
import './App.css';
import MusicList from './MusicList';
import SkipExample from './components/SkipExample';
import GetPeaksExample from './components/GetPeaksExample';
import LargeFilePeaksExample from './components/LargeFilePeaksExample';
import MediaElementWebAudioExample from './components/MediaElementWebAudioExample';
import MicrophoneExample from './components/MicrophoneExample';
import RegionsExample from './components/RegionsExample';
import SpectrogramExample from './components/SpectrogramExample';
import TimelineExample from './components/TimelineExample';

function App() {
  return (
    <div className="App">
      <RegionsExample />
    </div>
  );
}

export default App;
