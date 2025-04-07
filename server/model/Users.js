const mongoose = require('mongoose');

const User=new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const Usermodel=mongoose.model("users",User);
module.exports=Usermodel