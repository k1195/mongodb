import React,{useContext} from "react";
import {Link,useNavigate} from 'react-router-dom'
import { UserContext } from "../App";

const NavBar = ()=>{
  const navigate = useNavigate()
   const {state,dispatch} = useContext(UserContext)
   const renderList = ()=>{
     if(state){
       return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li><button className="btn waves-effect waves-light #1976d2 blue darken-2"  
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          navigate('/login')
        }}
        
        >Log Out</button></li> 
       ]  
     }else{
          return[
            <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Sign Up</Link></li>
          ]
     }
   }

    return(
        <nav>
    <div className="nav-wrapper white">
      <a to= {state?"/":"/login"} className="brand-logo left">Instagram</a>
      <ul id="nav-mobile" className="right">
          {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default NavBar