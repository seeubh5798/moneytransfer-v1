const express = require('express');
const { Account } = require('../db/db');
const authMiddleware = require('../middleware/middleware');
const mongoose = require('mongoose');
const router = express.Router();


router.get("/balance" ,authMiddleware ,async (req,res)=>{
    const account = await Account.findOne({userId: req.userId});
    console.log(account);
    res.status(200).json({
        "message" : {
            "balance" : account.balance
        }
    })
})


// endpoint to transfer money from account money from account1 to account2 
// Method: POST
// Route: /api/v1/account/transfer

router.post("/transfer", authMiddleware, async (req, res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    let {amount , to} = req.body;
    console.log(req.userId);
    console.log(to);
    const account = await Account.findOne({userId: req.userId}).session(session);
    // session here in query means these queries ar epart of transation and will only be commited if transaction succeeds
    amount = parseInt(amount);
    console.log("tranfer" , amount , typeof amount === "number");
    console.log("account" , account)
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.json({
            "message" : `aukaad mein lemde , send money less than ${account.balance}`
        });
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
    console.log("toAccount" , toAccount)
    if(!toAccount){
        await session.abortTransaction();
        res.json({
            "message" : "receipent does not exist in platform"
        })
    }

    await Account.updateOne({userId : req.userId}, {
        $inc : { balance : -amount}
    }).session(session);
    // const fromAcc = 
    // console.log("fromAcc" , fromAcc);

    await Account.updateOne({ userId : to}, {
        $inc : {
            balance : amount
        }
    }).session(session);

    await session.commitTransaction();
    await session.endSession();
    res.status(200).json({
        "message" : "money transferred successfully"
    });
})


module.exports = router;