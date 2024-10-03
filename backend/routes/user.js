const express = require('express');
const zod = require('zod');
console.log("before to user schema");
const {User, Account}  = require('../db/db');
console.log("after touer schema");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const authMiddleware  = require('../middleware/middleware');
const { default: mongoose } = require('mongoose');
const router = express.Router();

console.log("from user touer schema");
const signupSchema = zod.object({
    username :zod.string(),
    password:zod.string().min(5),
    firstname :zod.string(),
    lastname :zod.string(),
});

const signinSchema = zod.object({
    username : zod.string(),
    password : zod.string()
});

router.post("/signup", async (req,res)=>{
    const body = req.body;

    const parsedBody = signupSchema.safeParse(body);
    // res.header('Content-Type', 'priyahahahaha');
    if(parsedBody.error){
        return res.status(411).json({
           error: parsedBody.error
        });
    }

    const user = await User.findOne({
        username : parsedBody.data.username
    });
    console.log("usr from signup check" ,user);
    if(user){
        console.log("user inside signup check")
        res.status(409).json({
            error : "user already exists"
        });
        return ;
    }
    console.log("user check done");
    try{
    const dbres = await User.create(parsedBody.data);
    console.log("db created", dbres);
    const userId = dbres._id;
    const accountRes = await Account.create({userId , balance : parseInt(Math.random()*100000)});
    if(dbres){
        
            const token = jwt.sign({userId} , JWT_SECRET);
            res.status(200).json({
                "message" : "user created successfully",
                token ,
                balance : accountRes.balance,
                userId : dbres._id,
                firstname : dbres.firstname
            })
        }
    }
    catch(err){
        console.log(err);
        res.json({"error" : "database error"})
    }


});

router.post("/signin", async (req,res)=>{
    const body = req.body;
    const parsedbody = signinSchema.safeParse(body);
    console.log("parsedbody" ,parsedbody);
    if(parsedbody.error){
        return res.status(411).json({
            error: "invalid credentials"
         });
    }
    try{
        const dbres = await User.findOne({username : parsedbody.data.username , password : parsedbody.data.password});
        console.log("dbres" ,dbres);
        const userId = dbres._id;
        console.log(userId)
        const accountRes = await Account.findOne({userId });
        console.log(dbres);
        if(dbres){
                const token = jwt.sign({userId} , JWT_SECRET);
                res.status(200).json({
                    "message" : "logged in successfully",
                    token ,
                    userId : dbres._id,
                    balance : accountRes.balance,
                    firstname : dbres.firstname
                })
            }
            else{
                return res.status(404).json({
                    "error" : "username and password do not match"
                })
            }
        }
        catch(err){
            console.log(err);
            res.json({"error" : "database error"});
        }


     
});

const updateSchema = zod.object({
    firstname : zod.string().optional(),
    password : zod.string().optional(),
    lastname : zod.string().optional()

})
router.put("/updateuser", authMiddleware , async(req,res)=>{

    const parsedbody = updateSchema.safeParse(req.body);
    if(parsedbody.error){
        return res.status(411).json({
            "message" : "error while updating"
        })
    };

    const dbres = await User.updateOne({
        _id : req.userId
    }, parsedbody.data);

    res.status(200).json({
        message : "updated successfully"    
    });



});

router.get("/bulk", authMiddleware,async (req,res)=>{
    const filter = req.query.filter || "";

    try{
        const users = await User.find({
            $or : [
                {
                    firstname : {
                        "$regex" : filter
                    }
                },
                {
                    lastname: {
                        "$regex" : filter
                    }
                },
                {
                    username :{
                        "$regex" : filter
                    }
                }
            ]
        });

        const resptoSend = users.map((user)=>{
            return {
                firstname : user.firstname,
                lastname : user.lastname,
                username : user.username,
                _id : user._id
            } 
        })
        res.status(200).json({
            users : resptoSend
        })
    }
    catch(err){
        console.log(err);
    }
})

module.exports =  router ;