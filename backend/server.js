const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
dotenv.config();
const {User}=require('./models/user');


app.use(express.json());

app.use(cors());
const connectDB=async()=>{
    try{
    await mongoose.connect("mongodb://localhost:27017/registration");
    console.log("connected to database");
    }catch(err){
        console.error(err);
    }
}
connectDB();
app.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    const hashedpassword=await bcrypt.hash(password,10);
    const user=new User({name
        ,email
        ,password:hashedpassword});

    await user.save();
    console.log("user registered successfully",{user});
    res.status(201).json({message:"user registered successfully",user});
    
})

app.listen(process.env.port,()=>{console.log("server is running on port 8080")});
