import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import AdminMain from './components/adminMain';
import ChannelList from './components/ChannelList';
import Watch from './components/watch';
import Update from './components/update';
import View from './components/viewall';


function App() {
  const currntPosition = useLocation().pathname
  const [logged, setLogged] = useState(false);
  const [theme, SetTheme] = useState(true);
  const [channelName, SetChannelName] = useState('');

  const mainLoggin = (x) =>{
    if(x === 'superDuper'){
      setLogged(true);
    }
  }
  const ChangeTheme =()=>{
    SetTheme(!theme);
  }
  const shareMe= async () => {
    try {
      await navigator.share({ title: "OurTv", description:"OurTv || LiveTv", url: "https://live-tv-react.herokuapp.com" });
    } catch (err) {

    }
  }
  return (
    <>
      <nav className={`navbar ${theme?'mybg-light':'mybg-dark'}`}>
        <div className="container-fluid d-flex justify-content-between">
          <span className="navbar-brand mb-0 h1 rye"><Link className={`text-decoration-none nav-link ${theme?'mybg-light':'mybg-dark'}`} to="/">OurTV</Link></span>
          <div className="" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row">
              {currntPosition === '/' ? '' : <li>{channelName}</li>}
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
          <div className='float-end'>
            {theme?(<i class="bi bi-lightbulb-fill px-2" onClick={ChangeTheme}></i>):(<i class="bi bi-lightbulb px-2"  onClick={ChangeTheme}></i>)}
            <i className="bi bi-share-fill px-2" onClick={shareMe}></i>
          </div>
        </div>
      </nav>
      <div className={`${theme?'mybg-light':'bg-dark text-light'}`} style={{minHeight:'100vh'}}>
        <Routes>
          <Route path='/' element={<View theme={theme} />}/>    
          <Route path="add" element={<AdminMain mainLoggin={mainLoggin} logged={logged} theme={theme} />} />
          <Route path="update/:id" element={<Update mainLoggin={mainLoggin} logged={logged} />} />
          <Route path="channelList" element={<ChannelList logged={logged} />} />
          <Route path="watch/:id" element={<Watch theme={theme} channelName={SetChannelName} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
