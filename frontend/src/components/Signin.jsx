import React, { useState } from 'react'
import Heading from './subComponents/Heading'
import SubHeading from './subComponents/SubHeading'
import { InputBox } from './subComponents/InputBox'
import { Button } from './subComponents/Button'
import { BottomWarning } from './subComponents/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const Signin = () => {

    const navigate = useNavigate();
    const [username , setusername] = useState("");
    const [password , setpassword] = useState("");

    async function signIn(){
        if(username && password){
            try{
                const res = await axios.post("http://localhost:3000/api/v1/user/signin" , {
                    username ,
                    password
                });
                console.log(res)
                alert(res.data.message);
                sessionStorage.setItem("token" , res.data.token);
                navigate("/dashboard" , { state: { userId : res.data.userId , firstname : res.data.firstname, balance : res.data.balance} });
    
            }
            catch(err){
                console.log(err);
                alert("something went wrong pls check")
            }
        }
        else{
            alert("fill details in page")
        }
    }
  return (
    <>
     <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox placeholder="shubham@gmail.com" label={"Email"} onChange={(e)=> setusername(e.target.value)}/>
                <InputBox placeholder="" label={"Password"} onChange={(e)=> setpassword(e.target.value)}/>
                <div className="pt-4">
                <Button label={"Sign In"} onClick={signIn}/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
  </div>
    </>
    
  )
}

// export default Signin