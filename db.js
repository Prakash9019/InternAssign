const exp=require('express');
const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
// mongodb+srv://Prakash:<password>@cluster0.emqxvew.mongodb.net/?retryWrites=true&w=majority
const connectDB= ()=>{
    mongoose.connect("mongodb://localhost:27017/books");  // we can replace this link with cloud link
    console.log("connected");
}

module.exports=connectDB;