const {UserModel,Todomodel} = require('./db');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const JWT_SECERET = "testingemail.come";

const app = express();
app.use(express.json());
app.post('/signup',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    await UserModel.create({
        email:email,
        password:password,
        name:name
    })
    res.json({
        msg:"You are signed up"
    })
})

app.post("/signin",async function(req,res){
    const email= req.body.email
    const password = req.body.password
    const user = await UserModel.findOne({
        email:email,
        password:password
    })
    console.log(user);

    if(user){
        const token = jwt.sign({
            id:user._id
        },JWT_SECERET);
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            msg:"incorrect Credentials"
        })
    }
})

app.post('/todo',function(req,res){

})

app.get('/todos',function(req,res){

})


app.listen(3000);