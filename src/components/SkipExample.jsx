import React, { useState } from 'react';
import ReactWaves from '@dschoon/react-waves';

import africa from '../audio/africa.mp3';

function SkipExample() {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);

  const onPosChange = (newPos, newWavesurfer) => {
    if (newPos !== pos) {
      setPos(newPos);
      setWavesurfer(newWavesurfer);
    }
  };

  const onSeek = ({ pos, wavesurfer }) => {
    console.log(pos);
  };

  const skipAhead = () => {
    if (wavesurfer) {
      wavesurfer.seekTo(secondsToPosition(pos + 10));
    }
  };

  const secondsToPosition = (sec) => {
    return 1 / wavesurfer.getDuration() * sec;
  };

  return (
    <div className={'container example'}>
      <div
        className="play button"
        onClick={() => {
          setPlaying(!playing);
        }}
        style={{ left: '-99px' }}
      >
        {!playing ? '▶️' : '⏹'}
      </div>
      <div
        className="skip button"
        onClick={wavesurfer ? skipAhead : undefined}
        style={
          wavesurfer ? {} : { opacity: '.4', cursor: 'default' }
        }
      >
        {'⏩'}
      </div>
      <ReactWaves
        audioFile={africa}
        className="react-waves"
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
        pos={pos}
        onPosChange={onPosChange}
        onSeek={onSeek}
      />
    </div>
  );
}

export default SkipExample;
