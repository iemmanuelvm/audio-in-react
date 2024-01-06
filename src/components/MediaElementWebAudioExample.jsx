import React, { useState } from 'react';
import ReactWaves from '@dschoon/react-waves';

const MediaElementWebAudioExample = () => {
  const [isPlaying, setPlaying] = useState(false);

  return (
    <div className={'container example'}>
      <div className="play button" onClick={() => setPlaying(!isPlaying)}>
        {!isPlaying ? '▶️' : '⏹'}
      </div>
      <ReactWaves
        audioFile='http://traffic.libsyn.com/joeroganexp/p1196.mp3?dest-id=19997'
        className='react-waves'
        options={{
          backend: 'MediaElementWebAudio',
          barGap: 1,
          barWidth: 1,
          cursorWidth: 0,
          fillParent: true,
          height: 280,
          hideScrollbar: false,
          progressColor: '#0E4562',
          responsive: true,
          waveColor: '#D1D6DA',
        }}
        volume={1}
        zoom={0.05}
        playing={isPlaying}
      />
    </div>
  );
};

export default MediaElementWebAudioExample;
