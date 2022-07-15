import React, {useEffect, useState} from 'react'
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import {base} from './baseURL'

const baseURL = base+"update/";

function Update({logged}) {
  const navigate = useNavigate();
    const { id } = useParams();
    const [video, setVideo] = useState({
        name : '',
             imgUrl : '',
             low : '',
             mid : '',
             high : '',
             hd:'',
             language:'',
             category : ''
    });
    const load = async (x) => {
        axios.patch(baseURL+id, {
             name : document.getElementById('Name').value,
             imgUrl : document.getElementById('imgUrl').value,
             low : document.getElementById('low').value,
             mid : document.getElementById('mid').value,
             high : document.getElementById('high').value,
             hd : document.getElementById('hd').value,
             language : document.getElementById('language').value,
             category : document.getElementById('category').value,
        })
        .then((response) => {
          response.status ===200? navigate('/channellist'): console.log(response.status);
        });
        /* let alldata = Array.prototype.slice.call( document.getElementsByClassName('cart')).map(e=> {return e.value});
        console.log(alldata[0]); */
    }
    useEffect(() => {
        axios.get(base+'getOne/'+id).then((response) => {
          setVideo(response.data);
          //console.log(response.data);
        });
      }, []);

      /// Delete Data
      const deleteId=()=>{
        axios.delete(base+'delete/'+id).then((response) => {
          navigate('/channellist');
          //console.log(response.data);
        });
      }
      /// Add more Coloumn
      const addMore=()=>{
        /* document.getElementById('addExtra').innerHTML +=
        `<input  className='cart form-control my-1' type="text" placeholder='category' defaultValue={video.category}/>`
        ; */
      }

    /*
    {
            name : '',
             imgUrl : '',
             low : '',
             mid : '',
             high : '',
             category : ''
    }

    const addMov = ()=>{
        
         
        let formData = new FormData();
        formData.set('name', name);
        formData.set('imgUrl',imgUrl);
        formData.set('low',low);
        formData.set('mid',mid);
        formData.set('high',high);
        formData.set('category',category);
        load(formData);
    } */
    

    return (
    <>
        <div className="col-8 mx-auto">
            <input id="Name" className='form-control my-1' type="text" placeholder='name' defaultValue={video.name}/>
            <input id="imgUrl" className='form-control my-1' type="text" placeholder='imgUrl' defaultValue={video.imgUrl}/>
            <input id="low" className='form-control my-1' type="text" placeholder='low' defaultValue={video.low}/>
            <input id="mid" className='form-control my-1' type="text" placeholder='mid' defaultValue={video.mid}/>
            <input id="high" className='form-control my-1' type="text" placeholder='high' defaultValue={video.high}/>
            <input id="hd" className='form-control my-1' type="text" placeholder='hd' defaultValue={video.hd}/>
            <input id="language" className='form-control my-1' type="text" placeholder='language' defaultValue={video.language}/>
            <input id="category" className='form-control my-1' type="text" placeholder='category' defaultValue={video.category}/>

            {/* <input className="cart form-control my-1" type="text" placeholder='category' defaultValue={video.category}/>
            <input className='cart form-control my-1' type="text" placeholder='category' defaultValue={video.category}/>
            <input  className='cart form-control my-1' type="text" placeholder='category' defaultValue={video.category}/>
            <div id="addExtra">

            </div> */}
            <button onClick={load} className="btn btn-dark">Add</button>
            <button onClick={addMore} className="btn btn-dark m-2">Add Column</button>
            
            
        </div>
        <div className='col-8 col-md-4 col-lg-2 mx-auto my-4'>
            <button onClick={deleteId} className='btn w-100 d-block btn-outline-danger'>Delete</button>
        </div>
    </>
  )
}

export default Update