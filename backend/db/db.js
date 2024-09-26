const mongoose = require('mongoose');
const { DB_URL } = require('../config');
console.log("before connecting db from db.js");
try{    mongoose.connect(DB_URL).then((connection)=>{
    console.log("connected db from db.js");
})

}
catch(err){
    console.log(err)
}

console.log("after connecting db from db.js");
const UserSchema = new mongoose.Schema({
    username :String,
    password:String,
    firstname :String,
    lastname :String,


});

console.log("after user schema");
// In the real world, you shouldn’t store `floats` for balances in the database.
// You usually store an integer which represents the INR value with 
// decimal places (for eg, if someone has 33.33 rs in their account, 
// you store 3333 in the database).
const AccountSchema = new mongoose.Schema({
    balance : Number,
    userId : { type : mongoose.Schema.Types.ObjectId , ref  : 'User'}
})
console.log("after accounts schema");
const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {User , Account};