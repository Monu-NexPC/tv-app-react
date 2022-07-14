import React, {useState} from 'react'
import axios from "axios";
import {base} from './baseURL'

const baseURL = base+"post/";

function AdminMain({logged, mainLoggin}) {
    const [DataToSent, setDataToSent] = useState({})
    const load = async (x) => {
        axios.post(baseURL, {
             name : document.getElementById('Name').value,
             imgUrl : document.getElementById('imgUrl').value,
             low : document.getElementById('low').value,
             mid : document.getElementById('mid').value,
             high : document.getElementById('high').value,
             category : document.getElementById('category').value,
        })
        .then((response) => {
          console.log(response.data.message);
        });
    }
    /* const addMov = ()=>{
        
         
        let formData = new FormData();
        formData.set('name', name);
        formData.set('imgUrl',imgUrl);
        formData.set('low',low);
        formData.set('mid',mid);
        formData.set('high',high);
        formData.set('category',category);
        load(formData);
    } */
    const logCheck = () =>{
        let password = document.getElementById('loginDetail').value;
        mainLoggin(password);
    }
  
    return (
    <>
    {logged?(
        <div className="col-8 mx-auto">
            <input id="Name" className='form-control my-1' type="text" placeholder='name'/>
            <input id="imgUrl" className='form-control my-1' type="text" placeholder='imgUrl'/>
            <input id="low" className='form-control my-1' type="text" placeholder='low'/>
            <input id="mid" className='form-control my-1' type="text" placeholder='mid'/>
            <input id="high" className='form-control my-1' type="text" placeholder='high'/>
            <input id="category" className='form-control my-1' type="text" placeholder='category'/>
            <button onClick={load} className="btn btn-dark">Add</button>
        </div>
    ):(
        <div className="row m-0">
            <div className=" p-4">
                <div className="col-12 col-md-6 mx-auto my-2">
                    <input id="loginDetail" className="form-control" type="password"/>
                </div>
                <div className="col-12 col-md-6 mx-auto">
                    <button onClick={logCheck} className="btn btn-dark">Login</button>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default AdminMain