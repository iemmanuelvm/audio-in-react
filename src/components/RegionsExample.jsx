import React, { useRef, useState, useEffect } from 'react';
import ReactWaves, { Regions } from '@dschoon/react-waves';

import africa from '../audio/africa.mp3';

const RegionsExample = () => {
  const wavesurferRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeRegion, setActiveRegion] = useState('One');
  const [regions, setRegions] = useState({
    One: {
      id: 'One',
      start: 40,
      end: 60,
      color: 'rgba(100, 149, 240, 0.3)',
    },
    Two: {
      id: 'Two',
      start: 75,
      end: 100,
      color: 'rgba(100, 149, 240, 0.3)',
    },
  });

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.zoom(1);
      resetRegions();
    }
  }, [wavesurferRef]);

  const onLoading = ({ wavesurfer, originalArgs = [] }) => {
    setLoaded(originalArgs[0] === 100);
    wavesurferRef.current = wavesurfer;
  };

  const onPosChange = (newPos) => {
    if (newPos !== pos) {
      setPos(newPos);
    }
  };

  const secondsToPosition = (sec) => {
    return 1 / wavesurferRef.current.getDuration() * sec;
  };

  const zoom = (direction) => {
    const currentZoom = wavesurferRef.current.params.minPxPerSec;

    if (direction === 'in') {
      wavesurferRef.current.zoom(currentZoom + 1);
    } else if (direction === 'out' && currentZoom > 1) {
      wavesurferRef.current.zoom(currentZoom - 1);
    }
  };

  const removeRegion = (name) => {
    if (wavesurferRef.current.regions.list[name]) {
      wavesurferRef.current.regions.list[name].remove();
    }
  };

  const resetRegions = () => {
    // Only reset region "One" if it does not exist
    if (!wavesurferRef.current.regions.list.One) {
      wavesurferRef.current.addRegion({ id: 'One', start: 40, end: 60, color: 'rgba(100, 149, 240, 0.3)' });
    }
    // Only reset region "Two" if it does not exist
    if (!wavesurferRef.current.regions.list.Two) {
      wavesurferRef.current.addRegion({ id: 'Two', start: 75, end: 100, color: 'rgba(100, 149, 240, 0.3)' });
    }
  };

  const handleSingleRegionUpdate = (e) => {
    const newRegions = { ...regions, [e.region.id]: e.region };
    setRegions(newRegions);
  };

  const handleRegionClick = (e) => {
    setTimeout(() => {
      wavesurferRef.current.seekTo(secondsToPosition(e.originalArgs[0].start));
    }, 50);
    
  };

  const handleRegionDone = () => {
    setPlaying(false);
  };

  return (
    <div className={'container example'}>
      <div className="play button" onClick={() => setPlaying(!playing)}>
        { !playing ? '▶️' : '⏹' }
      </div>
      <ReactWaves
        audioFile={africa}
        className={'react-waves'}
        options={{
          barGap: 3,
          barWidth: 4,
          barHeight: 2,
          barRadius: 3,
          cursorWidth: 0,
          height: 200,
          hideScrollbar: true,
          progressColor: '#EC407A',
          responsive: true,
          waveColor: '#D1D6DA',
        }}
        volume={1}
        zoom={1}
        pos={pos}
        playing={playing}
        onPosChange={onPosChange}
        onLoading={onLoading}
      >
        <Regions
          onSingleRegionUpdate={handleSingleRegionUpdate}
          onSingleRegionIn={() => {}}
          onSingleRegionOut={() => {}}
          onSingleRegionRemove={() => {}}
          onSingleRegionClick={() => {}}
          onSingleRegionOver={() => {}}
          onSingleRegionLeave={() => {}}
          onRegionClick={handleRegionClick}
          onRegionIn={() => {}}
          onRegionOut={handleRegionDone}
          onRegionRemove={() => {}}
          onRegionDblclick={() => {}}
          onRegionOver={() => {}}
          onRegionLeave={() => {}}
          regions={regions}
        />
      </ReactWaves>
      <div className='zoom-buttons'>
        <div className="zoom-in button" onClick={() => zoom('in')}>
          ➕️
        </div>
        <div className="zoom-out button" onClick={() => zoom('out')}>
          ➖️
        </div>
        <div className="remove-region-1 button" onClick={() => removeRegion('One')}>
          🛑 <span>1</span>
        </div>
        <div className="remove-region-2 button" onClick={() => removeRegion('Two')}>
          🛑 <span>2</span>
        </div>
        <div className="reset button" onClick={resetRegions}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default RegionsExample;
