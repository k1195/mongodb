import axios from "axios";
import React , {useState,useEffect,useContext} from "react";
import M from 'materialize-css'
import {UserContext} from '../../App'


const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const{state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        axios.get("http://localhost:5000/mypost",{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }
        },
        )
  .then(function (response,) {
    // handle success
    setPics(response.data.mypost)
  })
  .catch(function (error) {
    // handle error
    M.toast({html: error.response.data.error , classes : "#c62828 red darken-3"})
  })
    },[])
    
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
          <div style={{
              display:"flex",
              justifyContent:"space-around",
              margin:"18px 0px",
              borderBottom:"1px solid grey"
          }}>
              <div>
                  <input type = "file">
                  </input>
                  <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" 
                    />
                   
              </div>
              <div>
                  <h4>{state? state.name : "loading"}</h4>
                  <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                      <h6>40 post</h6>
                      <h6>40 followers</h6>
                      <h6>40 follwing</h6>
                  </div>
              </div>
          </div>
          <div className="gallery">
              {
                  mypics.map(item=>{
                      return(
                        <img className="item" src={item.url} alt={item.title}/>
                      )
                  })
              }         
          </div>
        </div>
    )
}

export default Profile