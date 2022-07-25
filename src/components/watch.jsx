import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy'
//import ReactPlayer from 'react-player';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { base } from './baseURL';

const baseURL = base + 'getOne/';

function Watch({ theme, channelName }) {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState('');
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(1);
  const full = () => {
    let elem = document.getElementById('myvideo');
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {})
        .catch((err) => console.error(err));
    } else {
      elem.requestFullscreen();
    }
  };
  const exitFull = () => {
    let elem = document.getElementById('myvideo');
    elem.exitFullscreen();
  };
  const playMe = () => {
    setPlay(!play);
  };
  const click = useSingleAndDoubleClick(playMe, full);

  const similar = (x) => {
    axios.get(base + 'getSelected/' + x.toLowerCase()).then((response) => {
      if (response.status === 200) {
        setPost(response.data);
      } else {
      }
    });
  };

  useEffect(() => {
    axios.get(baseURL + id).then((response) => {
      setVideo(response.data);
      setVideoUrl(response.data.low);
      similar(response.data.category);
      channelName(response.data.name.toUpperCase());
    });
  }, [id]);

  const qualityControl = (x) => {
    switch (x) {
      case '1':
        setVideoUrl(video.low);
        break;
      case '2':
        setVideoUrl(video.mid);
        break;
      case '3':
        setVideoUrl(video.high);
        break;

      default:
        setVideoUrl('');
        break;
    }
  };
  return (
    <div className=" d-flex flex-column">
      <div
        className="col-12 col-md-8 col-lg-6 mx-auto px-2"
        id="myvideoCon"
        onClick={click}
      >
        <ReactPlayer
          className=""
          width={`100%`}
          id="myvideo"
          url={videoUrl}
          volume={volume}
          playing={play}
          pip={true}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center mt-1">
        <button
          onClick={playMe}
          className="mx-1 border-0 rounded-circle fs-4 overflow-hidden p-1"
        >
          {play ? (
            <i className="m-1 bi bi-pause"></i>
          ) : (
            <i className="m-1 bi bi-play-fill "></i>
          )}
        </button>
        <button
          onClick={full}
          onDblclick={exitFull}
          className="mx-1 border-0 rounded-circle fs-4 overflow-hidden p-1"
        >
          <i className="m-1 bi bi-arrows-fullscreen"></i>
        </button>
        <div className="col-4 px-1 d-none d-md-block mx-1">
          <input
            type="range"
            onChange={(e) => setVolume(Number(e.target.value))}
            className="form-range col-8"
            min="0"
            max="1"
            step="0.1"
            id="customRange3"
          ></input>
        </div>
        {/* <div className="col-4">
            <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onChange={e=>setPlayed(parseFloat(e.target.value))}
                  />
                  <progress max={1} value={played} />
            </div> */}

        <select
          name=""
          className="p-1 border-0 rounded-1"
          id="quality"
          onChange={(e) => qualityControl(e.target.value)}
        >
          <option value="1">Low</option>
          <option value="2">Mid</option>
          <option value="3">High</option>
        </select>
      </div>
      <h3 className="mt-5">Similar</h3>
      <div className="d-flex overflow-auto col-12 mb-3">
        {post.length === 0
          ? ''
          : post.map((post, index) => (
              <div
                key={index}
                className={`border col-4 ${theme ? 'mybg-light' : 'mybg-dark'}`}
              >
                <div className="col-12 col-md-10 col-lg-8 mx-auto">
                  <img
                    src="https://www.clipartmax.com/png/middle/241-2419765_live-tv-streaming-icon-live-tv-icon-png.png"
                    calss="m-0"
                    style={{ width: '100%' }}
                    alt=""
                  />
                </div>
                <h6 className="text-uppercase open-sans mt-1">
                  {' '}
                  <Link
                    to={'/watch/' + post._id}
                    className={`text-decoration-none ${
                      theme ? 'mybg-light' : 'mybg-dark'
                    }`}
                  >
                    {post.name}
                  </Link>
                </h6>
                <h6>{post.category}</h6>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Watch;

function useSingleAndDoubleClick(
  actionSimpleClick,
  actionDoubleClick,
  delay = 250
) {
  const [click, setClick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (click === 1) actionSimpleClick();
      setClick(0);
    }, delay);

    // the duration between this click and the previous one
    // is less than the value of delay = double-click
    if (click === 2) actionDoubleClick();

    return () => clearTimeout(timer);
  }, [click]);

  return () => setClick((prev) => prev + 1);
}