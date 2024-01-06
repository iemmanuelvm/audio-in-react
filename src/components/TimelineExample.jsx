import React, { useState, useRef } from 'react';
import ReactWaves from '@dschoon/react-waves';
import demoAudio from '../audio/demo.wav';

const TimelineExample = () => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);

  const onLoading = ({ wavesurfer, originalArgs = [] }) => {
    setWavesurfer(wavesurfer);
  };

  const onPosChange = (newPos, wavesurfer) => {
    if (newPos !== pos) {
      setPos(newPos);
    }
  };

  const defaultFormatTimeCallback = (seconds, pxPerSec) => {
    if (seconds / 60 > 1) {
      const minutes = parseInt(seconds / 60, 10);
      seconds = parseInt(seconds % 60, 10);
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return `${minutes}:${seconds}`;
    }
    return Math.round(seconds * 1000) / 1000;
  };

  const defaultTimeInterval = (pxPerSec) => {
    if (pxPerSec >= 25) {
      return 1;
    } else if (pxPerSec * 5 >= 25) {
      return 5;
    } else if (pxPerSec * 15 >= 25) {
      return 15;
    }
    return Math.ceil(0.5 / pxPerSec) * 60;
  };

  const defaultPrimaryLabelInterval = (pxPerSec) => {
    if (pxPerSec >= 25) {
      return 10;
    } else if (pxPerSec * 5 >= 25) {
      return 6;
    } else if (pxPerSec * 15 >= 25) {
      return 4;
    }
    return 4;
  };

  const defaultSecondaryLabelInterval = (pxPerSec) => {
    if (pxPerSec >= 25) {
      return 5;
    } else if (pxPerSec * 5 >= 25) {
      return 2;
    } else if (pxPerSec * 15 >= 25) {
      return 2;
    }
    return 2;
  };

  return (
    <div className={'container example'}>
      <div className='play button' onClick={() => setPlaying(!playing)}>
        {playing ? '⏹' : '▶️'}
      </div>
      <ReactWaves
        audioFile={demoAudio}
        options={{
          barGap: 1,
          barWidth: 0.8,
          barHeight: 2,
          cursorWidth: 1,
          height: 150,
          hideScrollbar: true,
          progressColor: '#EC407A',
          normalize: true,
          responsive: true,
          waveColor: '#D1D6DA',
        }}
        volume={1}
        zoom={1}
        pos={pos}
        playing={playing}
        onPosChange={onPosChange}
        onLoading={onLoading}
        timelineOptions={{
          container: '#timeline',
          height: 20,
          notchPercentHeight: 90,
          labelPadding: 5,
          unlabeledNotchColor: '#c0c0c0',
          primaryColor: '#000',
          secondaryColor: '#c0c0c0',
          primaryFontColor: '#000',
          secondaryFontColor: '#000',
          fontFamily: 'Arial',
          fontSize: 10,
          duration: null,
          zoomDebounce: false,
          formatTimeCallback: defaultFormatTimeCallback,
          timeInterval: defaultTimeInterval,
          primaryLabelInterval: defaultPrimaryLabelInterval,
          secondaryLabelInterval: defaultSecondaryLabelInterval,
          offset: 0,
        }}
      />
      <div id='timeline' style={{ width: '650px', margin: '0 auto' }} />
    </div>
  );
};

export default TimelineExample;
