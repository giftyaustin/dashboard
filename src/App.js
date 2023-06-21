import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import {useSelector } from "react-redux/es/hooks/useSelector";
import {Routes, Route} from "react-router-dom"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch()
  const history = useNavigate()
  const name = useSelector(state=>state.name)
  const fullName = useSelector(state=>state.fullName)
  const picture = useSelector(state=>state.name)
  const email = useSelector(state=>state.email)

  console.log(name)
  function handleCallbackResponse(res){
const user = jwt_decode(res.credential)
if(res.credential){
  dispatch({type: "loggedIn", payload:{fullName:user.name, name: user.given_name, email:user.email, picture:user.picture}})
  history('/dashboard')
}

  }
  useEffect(()=>{
/* global google */

google.accounts.id.initialize({
  client_id : "859095017978-flcvjs5vkb9e2ifoqaqi4f94io5cci7d.apps.googleusercontent.com",
  callback: handleCallbackResponse
});
google.accounts.id.renderButton(
  document.getElementById("signinDiv"), {theme: "outline", size:"large"}
)
  },[])
  return (
    <div className="App">
      <Routes>
     <Route exact path = "/" element={<Home/>}/>
     <Route exact path = "/dashboard" element={<div >Hello</div>}/>
     </Routes>
    </div>
  );
}

export default App;
