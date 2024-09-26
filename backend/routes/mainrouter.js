const express = require('express');
console.log("before user router from mainrouter");
const userRouter = require('./user');
const accountRouter = require('./account');
const router = express.Router();
// api/v1/user
// api/v1/transaction 
console.log("from main router");
router.use("/user" , userRouter);
router.use("/account" , accountRouter);

module.exports =  router;