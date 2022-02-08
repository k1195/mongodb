import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import axios from "axios";

const SignUp = ()=>{
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
     
    const postData = () =>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
         M.toast({html: "Invalid Email" , classes : "#c62828 red darken-3"})
         return 
        }
      
        axios.post("http://localhost:5000/signup",{
                name:name,
                password:password,
                email:email
            }).then(function (response) {
                M.toast({html:response.data.message,classes : "#66bb6a green lighten-1"})
                navigate('/login')
              })
              .catch(function (error) {
                M.toast({html: error.response.data.error , classes : "#c62828 red darken-3"})
              });

        
    }

    return(   
        <div className="mycard ">
            <div className="card auth-card input-field">
                   <h2>Instagram</h2>
                   <input 
                   type = "text"
                   placeholder="name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}>    
                   </input>
                   <input 
                   type = "text"
                   placeholder="email"
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}></input>

<input
                   type = "text"
                   placeholder="password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}></input>
                   <button className="btn waves-effect waves-light #1976d2 blue darken-2"  
                           onClick={()=>postData()}>SignUp
        
  </button>
  <h5>
      <Link to='/login'>Already have an account?</Link>
  </h5>

        </div>
        </div>
      
    )
}

export default SignUp