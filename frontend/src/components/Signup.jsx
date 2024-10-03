import { useState } from "react"
import { BottomWarning } from "./subComponents/BottomWarning"
import { Button } from "./subComponents/Button"
import Heading from "./subComponents/Heading"
import { InputBox } from "./subComponents/InputBox"
import SubHeading from "./subComponents/SubHeading"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Signup = () => { 
    const [username , setusername] = useState("");
    const [firstname , setfirstname] = useState("");
    const [lastname , setlastname] = useState("");
    const [password , setpassword] = useState("");

    const navigate = useNavigate();
    // console.log(username);
    async function signUpuser(){
        if(username && password && firstname && lastname){
            try{
                const res = await axios.post("http://localhost:3000/api/v1/user/signup" , {
                    username ,
                    firstname,
                    lastname ,
                    password
                });
                // console.log(res.status)
                alert(res.data.message);
                sessionStorage.setItem("token" , res.data.token);
                navigate("/dashboard", { state: { userId : res.data.userId , firstname : res.data.firstname, balance : res.data.balance} });
    
            }
            catch(err){
                // console.log(err);
                alert(err.response.data.error)
            }
        }
        else{
            alert("fill details in page")
        }
        
            
    }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="Shubham" label={"First Name"} type="text" onChange={(e)=> setfirstname(e.target.value)}/>
        <InputBox placeholder="Agrawal" label={"Last Name"} type="text" onChange={(e)=> setlastname(e.target.value)}/>
        <InputBox placeholder="shubham@gmail.com" label={"Email"} type="email" onChange={(e)=> setusername(e.target.value)}/>
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=> setpassword(e.target.value)}/>
        <div className="pt-4">
          <Button label={"Sign up"} onClick={signUpuser}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}