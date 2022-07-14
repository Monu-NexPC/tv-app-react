import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import AdminMain from './components/adminMain';
import ChannelList from './components/ChannelList';
import Watch from './components/watch';
import Update from './components/update';
import View from './components/viewall';


function App() {
  const [logged, setLogged] = useState(false);
  const mainLoggin = (x) =>{
    if(x === 'superDuper'){
      setLogged(true);
    }
  }
  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1"><Link className="nav-link" to="/">Navbar</Link></span>
          <div className="" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row">
              {logged?(
              <li className="nav-item mx-2">
                <Link className="nav-link active" to="channelList">Channels</Link>
              </li>
              ):('')}
              {logged?(
              <li className="nav-item">
                <Link className="nav-link active" to="add">Add</Link>
              </li>
              ):('')}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<View />}/>    
        <Route path="add" element={<AdminMain mainLoggin={mainLoggin} logged={logged} />} />
        <Route path="update/:id" element={<Update mainLoggin={mainLoggin} logged={logged} />} />
        <Route path="channelList" element={<ChannelList logged={logged} />} />
        <Route path="watch/:id" element={<Watch />} />
      </Routes>
    </>
  );
}

export default App;
