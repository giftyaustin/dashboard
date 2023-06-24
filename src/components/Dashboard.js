import React , {useEffect, useRef, useState} from 'react';
import "./dashboard.css";
import { useSelector } from 'react-redux';
import Stats from './statComponents/Stats';
import Graph from './statComponents/Graph';
import PieChart from './statComponents/PieChart';
import "./dashboardMenu.css"
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const history = useNavigate();
  const [picture , setPicture] = useState()
  const menuRef = useRef();
  const rightRef = useRef();
  const [navClicked, setNavClicked] = useState(false)
  const menuItems = ["Dashboard", 'Transactions', "Schedules", 'Users', 'Settings']
    // const picture = useSelector(state=>state.picture)
    const [menuBarClass, setMenuBarClass]  = useState("menu-bar-h mobile")
    useEffect(()=>{
      if(navClicked){
        menuRef.current.className="menu-bar-h mobile"
        rightRef.current.style.overflow = "hidden";
      }
      else{
        rightRef.current.style.overflow = "auto";
        menuRef.current.className = "menu-bar-h"
      }
    },[navClicked])
  useEffect(()=>{
    if(sessionStorage.getItem('user')){
      try {
        const user = jwt_decode(sessionStorage.getItem("user")&&sessionStorage.getItem("user"))
        if(user){
          setPicture(user.picture)
          console.log(user.picture)
        }else{
          history("/")
        }
      } catch (error) {
        history("/")
      }
    }else{
      history('/')
    }
  },[])
  return (
    <div className='Dashboard'>
        
      <div className={menuBarClass} ref={menuRef}>{navClicked &&
        <img src={require("../images/close.png")} alt="" className='close' onClick={()=>{setNavClicked(false)}}/>}
        <div className="menu-h">
        <div className="menu-board-text">Board.</div>
        <div className="menu-nav-h">
          {menuItems.map((c,i)=>{
           
            return(<div className='menu-item-h'><img src={require(`../images/${menuItems[i]}.png`)} alt="" className='menu-img'/><div className="menu-item">{c}</div></div>)
          })}
        </div><div className="foot-item-h"><div className="foot-item menu-item">Help</div>
        <div className="foot-item menu-item">Contact us</div></div></div>
      </div>
      <div className="right-h" ref={rightRef}>
        <div className="search-h">
            <div className='nav-btn-h'><div className='dashboard-text'>{!navClicked && <img onClick={()=>{setNavClicked(!navClicked)}} className='three-lines-sym' src={require('../images/threeLines.png')}/>}Dashboard</div></div>
            <div className="snp-h">
                <div className='search-items'>
                <input type="text" className='search-inp' placeholder='Search...'/>
                <div className="glass-h">
                    <img src={require("../images/search.png")} alt="" className="glass-sym" />
                </div>
                </div>
                <div className='notification-h'><img src={require("../images/notification.png")} alt="" className='notification-sym'/></div>
                <div className="p-picture-h"><img src={picture} alt="" className='p-picture'/></div>
            </div>
        </div>
        <Stats/>
        <Graph />
        <PieChart/>
      </div>
      
    </div>
  )
}

export default Dashboard
