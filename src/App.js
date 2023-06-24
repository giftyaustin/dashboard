import { useEffect , useState} from "react";
import jwt_decode from "jwt-decode";
import {useSelector } from "react-redux/es/hooks/useSelector";
import {Routes, Route} from "react-router-dom"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";

import Dashboard from "./components/Dashboard";

function App() {
  const [test, setTest] = useState(0)
  const dispatch = useDispatch()
  const history = useNavigate()
  const name = useSelector(state=>state.name)
  const fullName = useSelector(state=>state.fullName)
  const picture = useSelector(state=>state.name)
  const email = useSelector(state=>state.email)


  function handleCallbackResponse(res){
const user = jwt_decode(res.credential)
if(res.credential){
  sessionStorage.setItem("user", res.credential)
  dispatch({type: "loggedIn", payload:{fullName:user.name, name: user.given_name, email:user.email, picture:user.picture}})
  history('/dashboard')
}

  }



const loadGoogle =()=>{
/* global google */
try {google.accounts.id.initialize({
  client_id : "859095017978-flcvjs5vkb9e2ifoqaqi4f94io5cci7d.apps.googleusercontent.com",
  callback: handleCallbackResponse
});
google.accounts.id.renderButton(
  document.getElementById("signinDiv"), {theme: "outline", size:"large", prompt: "select_account"}
);
  
} catch (error) {
  setTest(test+1)
}
}




  useEffect(()=>{

    setTimeout(()=>{
      loadGoogle()
    },3000)



  },[])
  return (
    <div className="App">
      <Routes>
     <Route exact path = "/" element={<Home/>}/>
     <Route exact path = "/dashboard" element={<Dashboard/>}/>
     </Routes>
    </div>
  );
}

export default App;
