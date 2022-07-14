import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom"

const baseURL = "https://live-tv-api.herokuapp.com/channelapi/getAll";

export default function ChannelList({logged}) {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
    if(!logged){
     navigate('/add');
      }
  }, []);

  if (!post) return null;
  
  return (
    <div className="row m-0">
      {post.map((post, index)=>(
        <div key={index} className="border col-4">
            <img src={post.imgUrl} alt="" />
            <h1> <Link to={'/watch/'+post._id}>{post.name}</Link></h1>
            <h4>{post.category}</h4>
            <p> <Link to={'/update/'+post._id}>{post.name}</Link></p>
        </div>
      ))}
    </div>
  );
}
