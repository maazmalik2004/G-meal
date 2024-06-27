import './Navbar.css';

import React, {
  useContext,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo4} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>blogs</a>
        <a href='#preference' onClick={()=>setMenu("preferences")} className={`${menu==="preferences"?"active":""}`}>preferences</a>
        <a href='#plan' onClick={()=>setMenu("plan")} className={`${menu==="plan"?"active":""}`}>plan</a> 
        <a href='#upload' onClick={()=>setMenu("chatbot")} className={`${menu==="chatbot"?"active":""}`}>upload image</a>       
        <a href='#footer' onClick={()=>setMenu("contact")} className={`${menu==="contact"?"active":""}`}>contact us</a>
      </ul>
      {/* <div className="navbar-right">
       
        <Link to='/imageUpload' className='navbar-search-icon'>
          <img src={assets.camera} alt="" className='camera-logo'/>
          <div className={getTotalCartAmount()>0?"dot":""}></div>
        </Link>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
    </div> */}
    </div>
  )
}

export default Navbar
