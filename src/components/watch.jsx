import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player/lazy'
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import {base} from './baseURL'

const baseURL = base+"getOne/";

function Watch() {
     const { id } = useParams();
     const [post, setPost] = useState([]);
    const [video, setVideo] = useState();
    const [videoUrl, setVideoUrl] = useState('');
    const [play, setPlay] = useState(false)
    const [played, setPlayed] = useState(0)
    const [volume, setVolume] = useState(0.1)
    const playMe =()=>{
        let temp = play;
        setPlay(!play)
    }
    const full= ()=>{
        let elem = document.getElementById("myvideo");
  elem.requestFullscreen();

}
const similar=(x)=>{
    axios.get(base+'getSelected/'+x.toLowerCase()).then((response) => {
        if(response.status === 200){
            setPost(response.data)
        }else{
        }
      });
}
    
    useEffect(() => {
        axios.get(baseURL+id).then((response) => {
          setVideo(response.data);
          setVideoUrl(response.data.low);
          similar(response.data.category)

        });
        
      }, [id]);
      const qualityControl =(x)=>{
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
      }
  return (
    <div className='col-12 col-md-8 col-lg-6 mx-auto px-2 d-flex flex-column'>
        <div className=''>
            <ReactPlayer className="" width='100%' id="myvideo" url={videoUrl} volume={volume} playing={play} onSeek={e => console.log('onSeek', e)} onBuffer={() => console.log('onBuffer')}  onProgress={state=>console.log('onProgress', state)}/>
        </div>
        <div className='d-flex justify-content-center'>
            <button onClick={playMe}>{play?(<i className="bi bi-pause border"></i>):(<i className="bi bi-play-fill border"></i>)}</button>
            <button onClick={full} ><i className="bi bi-arrows-fullscreen"></i></button>
            <div className='col-4 px-1'>
                <input type="range" onChange={e=>setVolume(Number(e.target.value))} className="form-range col-8" min="0" max="1" step="0.1" id="customRange3"></input>
            </div>
            {/* <div className="col-4">
            <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onChange={e=>setPlayed(parseFloat(e.target.value))}
                  />
                  <progress max={1} value={played} />
            </div> */}

            <select name="" id="quality" onChange={e=>qualityControl(e.target.value)}>
                <option value="1">Low</option>
                <option value="2">Mid</option>
                <option value="3">High</option>
            </select>
        </div>
        <h3 className='mt-5'>Similar</h3>
        <div className='d-flex '>
            
        {post.length===0?'':post.map((post, index)=>(
        <div key={index} className="border col-4 text-center">
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
                <img src='https://www.clipartmax.com/png/middle/241-2419765_live-tv-streaming-icon-live-tv-icon-png.png' calss="" style={{width:'100%'}} alt="" />
            </div>
            <h1> <Link to={'/watch/'+post._id}>{post.name}</Link></h1>
            <h4>{post.category}</h4>
        </div>
      ))}
        </div>
        
    </div>
  )
}

export default Watch