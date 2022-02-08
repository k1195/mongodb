import React,{useState,useEffect} from "react";
import axios from "axios";
import M from 'materialize-css'


const CreatePost = () =>{

  const[title,setTitle] = useState("")
  const[body,setBody] = useState("")
  const[image,setImage] = useState("")
  const[url,setUrl] = useState("")
  useEffect(()=>{
         if(url)
         {
    axios.post("http://localhost:5000/createpost",{
      title:title,
      body:body,
      url:url 
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("jwt")
      }
    }).then(function (response) {
      M.toast({html:"Posted uploaded",classes : "#66bb6a green lighten-1"})
    })
    .catch(function (error) {
      M.toast({html: error.response.data.error , classes : "#c62828 red darken-3"})
    });
  }
  },[url])

   const postData = () =>{
     const data = new FormData()
     const fileName = image[0];
     data.append("file",fileName)
     data.append("upload_preset","insta-clone")
     data.append("cloud_name", "ddkbftrey")
     console.log(data);
     axios.post("https://api.cloudinary.com/v1_1/ddkbftrey/image/upload",data)
     .then(function (response) {
      setUrl(response.data.url)
    })
    .catch(function (error) {
     console.log(error.response.data.error)
    });
   }

     return(
         <div className="card input-field"
         style={{margin:"30px auto",
                maxWidth:"500px",
                padding:"20px",
                textAlign:"center"}}>
               <input 
                   type = "text"
                   placeholder="title"
                   value={title}
                   onChange={(e)=>setTitle(e.target.value)}></input>
                   <input 
                   type = "text"
                   placeholder="body"
                   value={body}
                   onChange={(e)=>setBody(e.target.value)}></input>
                   <div className="file-field input-field">

      <div className="btn-floating btn-large">
      <i className="material-icons">add</i>
        <input type="file" onChange={(e)=>setImage(e.target.files)}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
     
    <button className="btn waves-effect waves-light #1976d2 blue darken-2" 
             onClick={()=>postData()} >Upload
        </button>

         </div>
     )
}

export default CreatePost