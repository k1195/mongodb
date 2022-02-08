import axios from "axios";
import React , {useState,useEffect, useContext} from "react";
import M from 'materialize-css'
import { UserContext } from "../../App";

const Home = ()=>{

    const[allposts,setAllPosts] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        axios.get("http://localhost:5000/allpost",{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }
        })
  .then(function (response,) {
    setAllPosts(response.data.posts)
    //console.log(allposts)
  })
  .catch(function (error) {
    M.toast({html: error.response.data.error , classes : "#c62828 red darken-3"})
  })
    },[])

    const likePost = (id)=>{
        axios.put("http://localhost:5000/like",
        {
            postId:id
        },{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }} )
  .then(function (response,) {
      console.log(response)
    const newData = allposts.map(item=>{
        if(item._id==response.data._id){
             console.log(item._id,response.data._id)
            return response.data
        }else{
            return item
        }
    })
    setAllPosts(newData)
  })
  .catch(function (error) {
    // handle error
    M.toast({html: error.response.data.error , classes : "#c62828 red darken-3"})
  })
    }


    const unlikePost = (id)=>{
        axios.put("http://localhost:5000/unlike",
        {
            postId:id
        },
        {headers: {
              Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }})
  .then(function (response,) {
      console.log(response)
    const newData = allposts.map(item=>{
        if(item._id==response.data._id){
            return response.data
        }else{
            return item
        }
    })
   setAllPosts(newData)
  })
  .catch(function (error) {
    // handle error
    M.toast({html: error.response.data.error , classes : "#c62828 red darken-3"})
  })
    }
    return(
        <div className="home">
            {
                allposts.map(item=>{
                    return(
                        <div className="card home-card">
                        <h5>{item.title}</h5>
                        <div className="card-image">
                            <img src={item.url}></img>
                        </div>
                        <div className="card-content">
                        <i className="small material-icons" style={{color:"yellow"}}>insert_emoticon</i>
                        {item.likes.includes(state._id)
                        ? <i className="small material-icons" onClick={()=>{
                            unlikePost(item._id) }}
                            >thumb_down</i>
                        : <i className="small material-icons" onClick={()=>{
                            likePost(item._id) }}
                        >thumb_up</i>}
                        <h6>{item.likes.length} likes</h6> 
                           <h6>{item.body}</h6>
                           <p>{item.postedBy.name}</p>
                           <input type="text" placeholder="add a comment"></input>
                        </div>
                        </div>
                    )
                })
            }
            </div>
    )
}

export default Home