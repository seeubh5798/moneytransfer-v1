const express = require("express");
const mainRouter = require('./routes/mainrouter')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1" , mainRouter );
// all v1 request will go the main router
const mongoose = require('mongoose');

console.log("before connecting db");
  



app.listen(3000 , ()=>{
    console.log("server started on port 3000");
    // mongoose.connect("mongodb+srv://Shubham:mUrwtaE8O4n7iIhZ@cluster0.ckcf4.mongodb.net").then((connection)=>{
    //     console.log("connected db");
    // })
})
 
