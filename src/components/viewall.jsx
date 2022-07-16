import axios from "axios";
import React, {useEffect, useState} from "react";
import {  Link } from "react-router-dom"
import {base} from './baseURL'

const baseURL = base+"getAll/";

export default function View({logged}) {
  const [post, setPost] = useState(null);
  const [tempPost, setTempPost] = useState(null);
  const [lang, setLang]= useState('1');
  const[genre, setGenre]= useState('1');

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      setTempPost(response.data);
    });
  }, []);
  const languageChange = (e)=>{
    e.target.value=='1'?setPost(genre==='1'?tempPost:tempPost.filter(a=>{return a.category===genre})):setPost(tempPost.filter(a=>{return genre==='1'?a.language === e.target.value: a.language === e.target.value&&a.category==genre}));
    setLang(e.target.value);
  }
  const genreChange = (e)=>{
      /* e.target.value=='1'?setPost(tempPost):setPost(tempPost.filter(a=>{return a.category === e.target.value})); */
      e.target.value=='1'?setPost(lang==='1'?tempPost:tempPost.filter(a=>{return a.language===lang})):setPost(tempPost.filter(a=>{return lang==='1'?a.category === e.target.value: a.category === e.target.value&&a.language==lang}));
      setGenre(e.target.value);
  }
  const search = (e)=>{
      setPost(tempPost.filter(a=> {return a.name.match(e.target.value)}))
  }
  

  if (!post) return null;
  
  return (
    <div className="row m-0">
      <div className="row m-0 g-0">
        <div className="col-12">
          <input type="text" name="" className="form-control" id="search" placeholder="Search" onChange={search}/>
        </div>
        <div className="col-6">
          <select className="form-select rounded-0 dropdown-toggle" id="language" onChange={languageChange}>
            <option value="1">Language All</option>
            <option value="hindi">Language Hindi</option>
            <option value="english">Language English</option>
            <option value="bengali">Language Bengali</option>
            <option value="bhojpuri">Language Bhojpuri</option>
            <option value="Tamil">Language Tamil</option>
            <option value="Telgu">Language Telgu</option>
          </select>
        </div>
        <div className="col-6">
          <select className="rounded-0 form-select dropdown-toggle" id="genre" onChange={genreChange}>
            <option value="1">All</option>
            <option value="news">News</option>
            <option value="music">Music</option>
            <option value="movie">Movie</option>
            <option value="kids">Kids</option>
            <option value="sports">sports</option>
            <option value="information">information</option>
            <option value="anime">Anime</option>
          </select>
        </div>
      </div>
      {post.map((post, index)=>(
        <div key={index} className="border col-4">
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
                <img src='https://www.clipartmax.com/png/middle/241-2419765_live-tv-streaming-icon-live-tv-icon-png.png' calss="" style={{width:'100%'}} alt="" />
            </div>
            <h1> <Link to={'/watch/'+post._id}>{post.name}</Link></h1>
            <h4>{post.category}</h4>
        </div>
      ))}
    </div>
  );
}
