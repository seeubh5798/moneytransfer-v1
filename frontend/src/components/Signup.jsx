import { BottomWarning } from "./subComponents/BottomWarning"
import { Button } from "./subComponents/Button"
import Heading from "./subComponents/Heading"
import { InputBox } from "./subComponents/InputBox"
import SubHeading from "./subComponents/SubHeading"


export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="Shubham" label={"First Name"} />
        <InputBox placeholder="Agrawal" label={"Last Name"} />
        <InputBox placeholder="shubham@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}