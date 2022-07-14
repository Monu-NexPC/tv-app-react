import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom"
import {base} from './baseURL'

const baseURL = base+"getAll/";

export default function View({logged}) {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;
  
  return (
    <div className="row m-0">
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
