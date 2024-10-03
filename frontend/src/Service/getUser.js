import axios from "axios";


export const getRegisteredUsers = async function (filter , userId){
        const token = sessionStorage.getItem("token");
        console.log(token);
        const res = await axios.get("http:///localhost:3000/api/v1/user/bulk?filter="+filter , {
            headers : {
                Authorization: "Bearer " + token
            }
        });
        console.log(res);
        const userList = res.data.users.filter(user => user._id !== userId)
        return userList;
    }

