import { useState } from 'react';
import ReactWaves from '@dschoon/react-waves';

import africa from './tracks/track1.mp3';

function MusicList() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={'container example'}>
      <div
        className="play button"
        onClick={() => {
          setPlaying(!playing);
        }}
      >
        {!playing ? '▶' : '■'}
      </div>
      <ReactWaves
        audioFile={africa}
        className={'react-waves'}
        options={{
          barHeight: 2,
          cursorWidth: 0,
          height: 200,
          hideScrollbar: true,
          progressColor: '#EC407A',
          responsive: true,
          waveColor: '#D1D6DA',
        }}
        volume={1}
        zoom={1}
        playing={playing}
      />
    </div>
  );
}

export default MusicList;
