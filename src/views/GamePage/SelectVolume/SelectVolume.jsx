import { useEffect, useRef, useState } from 'react';
import { useStateValue } from '../../../StateProvider';
import './SelectVolume.css';

const SelectVolume = ({ setVolume, playlist }) => {
  const [{ spotify }] = useStateValue();
  const [tracks, setTracks] = useState([]);

  const [track, setTrack] = useState(null);
  const [input, setInput] = useState(0.25);
  const audio = useRef(null);

  const handlePlayTrack = () => {
    if (!tracks.length) return;

    if (!audio.current.paused) {
      setTrack(null);
      audio.current.pause();
    } else {
      const idx = Math.floor(Math.random() * tracks.length);
      const track = tracks[idx];
      
      if (track.track.preview_url) {
        audio.current.src = track.track.preview_url;
      } else {
        console.log('no source');
        handlePlayTrack();
      }
      setTrack(track);
      audio.current.volume = input;
      audio.current.play();
    }
  }

  //* Live changing volume
  useEffect(() => {
    audio.current.volume = input;
  }, [input]);

  //* Getting tracks from api
  useEffect(() => {
    const getTracks = async () => {
      let tempTracks = [];

      for (let i = 0; i < playlist.tracks.total; i += 100) {
        const { items } = await spotify.getPlaylistTracks(playlist.id, { limit: 100, offset: i });
        tempTracks = [...tempTracks, ...items.filter((item) => item.track.preview_url)];
      }
      setTracks(tempTracks);
    }
    getTracks();
  }, [playlist.id, playlist.tracks.total, spotify]);

  return (
    <div className="selectVolume">
      <h1>Select volume</h1>

      <div className="selectVolume__content">
        <input onChange={(e) => setInput(e.target.value)} value={input} step="0.01" min="0.01" max="1" type="range" />

        <div className="selectVolume__buttons">
          <div className={!tracks.length ? 'disabled' : ''} onClick={handlePlayTrack}>{!track ? 'PLAY' : 'STOP'}</div>
          <div onClick={() => setVolume(input)}>Set volume</div>
        </div>
      </div>

      <audio ref={audio}></audio>
    </div>
  )
}

export default SelectVolume
