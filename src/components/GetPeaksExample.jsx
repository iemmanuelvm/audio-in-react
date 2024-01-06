import React, { useState } from 'react';
import ReactWaves from '@dschoon/react-waves';

import africa from '../audio/africa.mp3';

function GetPeaksExample() {
  const [audioPeaks, setAudioPeaks] = useState([]);
  const [playing, setPlaying] = useState(false);

  const onWaveformReady = ({ wavesurfer }) => {
    wavesurfer.exportPCM(null, 1000, true, null).then((exportPCM) => {
      if (exportPCM) {
        setAudioPeaks(exportPCM);
      }
    });
  };

  const clickToCopy = () => {
    let textArea = document.createElement('textarea');
    textArea.value = audioPeaks;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  return (
    <div>
      <div className={'container example'} style={{ display: 'none' }}>
        <div
          className="play button"
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {!playing ? '▶️' : '⏹'}
        </div>
        <ReactWaves
          audioFile={africa}
          className="react-waves"
          options={{ backend: 'MediaElement' }}
          onWaveformReady={onWaveformReady}
        />
      </div>
      <div>
        {audioPeaks.length ? (
          <div>
            <div id="copy-btn">
              <button onClick={clickToCopy}>Copy</button>
            </div>
            <div id="audioPeaks">{audioPeaks}</div>
          </div>
        ) : (
          <div className="loader" />
        )}
      </div>
    </div>
  );
}

export default GetPeaksExample;
