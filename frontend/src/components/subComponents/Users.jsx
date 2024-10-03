import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {getRegisteredUsers} from "./../../Service/getUser"

export const Users = ({userId}) => {
    // Replace with backend call
    const [users, setUsers] = useState([]);

    const [filter , setfilter] = useState("");

    async function getList(filter , userId){

        const userList = await getRegisteredUsers(filter , userId);
        setUsers(userList);
        console.log(userList);

    }
    
    useEffect(()=>{
        
        getList(filter , userId);
        

    } ,[filter]);

    let timer ;
    function debouncsearch(value){
        if(timer){
            clearInterval(timer);
        }
        timer = setTimeout(()=>{
            setfilter(value)
        }, 1000)
    }

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search registered users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={(e)=> debouncsearch(e.target.value)}></input>
        </div>
        <div>
            {users.map(user => <User user={user} key={user._id}/>)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    function sendMoney(){
        navigate("/send?username=" + user.firstname+"&userId=" + user._id);
    }
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {(user.firstname && user.firstname[0].toUpperCase() )+ (user.lastname && user.lastname[0].toUpperCase())}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname +" "} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={sendMoney}/>
        </div>
    </div>
}