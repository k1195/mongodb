import React , {useEffect,createContext,useReducer,useContext} from "react";
import NavBar from "./components/navbar";
import "./App.css"
import {BrowserRouter,Route, Routes,useNavigate} from 'react-router-dom'
import Home from "./components/screens/home";
import Login from "./components/screens/login";
import Profile from "./components/screens/profile";
import SignUp from "./components/screens/signUp";
import CreatePost from "./components/screens/createpost";
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
     
      if(user){
       dispatch({type:"USER",payload:user})
         // history('/')
      }else{
        history('/login')
      }
  },[])
  return(
     <Routes>
  <Route exact element = {<Home></Home>} path="/"/>
  <Route element = {<Login></Login>} path="/login"/>
  <Route element = {<SignUp></SignUp>} path="/signup"/>
  <Route element = {<Profile></Profile>} path="/profile"/>
  <Route element = {<CreatePost></CreatePost>} path="/createpost"/>  
  </Routes>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
   return (
     <UserContext.Provider value={{state,dispatch}}>
  <BrowserRouter>
<NavBar/>
    <Routing/>
  </BrowserRouter>  
  </UserContext.Provider>
  );
}

export default App;
