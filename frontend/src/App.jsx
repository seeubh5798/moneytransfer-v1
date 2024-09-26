import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import {Signin} from './components/Signin';
import {Signup} from './components/Signup';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import { useEffect } from 'react';


function App() {

  const navigate = useNavigate();
  useEffect(()=>{
    navigate("/signup")
  },[])
  
  return (
    
    <>
    {/* <h1> Hii from app component</h1> */}
    
      <Routes>
        <Route path="/signin" element = {<Signin />} />
        <Route path="/signup" element = {<Signup />} />
        <Route path="/dashboard" element = {<Dashboard />} />
        <Route path="/send" element = {<SendMoney />} />
      </Routes>
    
    </>
  )
}

export default App
