import React from 'react'
import Heading from './subComponents/Heading'
import SubHeading from './subComponents/SubHeading'
import { InputBox } from './subComponents/InputBox'
import { Button } from './subComponents/Button'
import { BottomWarning } from './subComponents/BottomWarning'
export const Signin = () => {
  return (
    <>
     <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox placeholder="shubham@gmail.com" label={"Email"} />
                <InputBox placeholder="" label={"Password"} />
                <div className="pt-4">
                <Button label={"Sign In"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
  </div>
    </>
    
  )
}

// export default Signin