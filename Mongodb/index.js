const express = require('express')
const mongoose = require('mongoose');
const {UserModel,TodoModel}= require('./db')
const jwt = require("jsonwebtoken");
const { json } = require('body-parser');
const JWT_SCERET = "testing@testing.io";
mongoose.connect("mongodb+srv://admin:admin%400701@cluster0.xujxl.mongodb.net/todo-app-database")
const app = express();

app.use(express.json());

app.post('/signup',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.password;

    await UserModel.create({
        email:email,
        password:password,
        name:name
    })
    res.json({
        message: "You are signed up"
    })
})


app.post('/signin', async function(req,res){
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email:email,
        password:password
    })
    console.log(user)

    if(user){
        const token = jwt.sign({
            id:user._id.toString()

        },JWT_SCERET)
        res.json({
            token:token
        })
    }else{
        res.status(404).json({
            message:"Invalid Crendentials"
        })
    }
})


function auth(req,res,next){
    const token = req.headers.token;
    const decodeddata = jwt.verify(token,JWT_SCERET);
    if(decodeddata){
        req.userId = decodeddata.id;
        next();
    }else{
        res.status(403),json({
            message:"incoorect"
        })
    }
}

app.post('/todo',auth,function(req,res){
    const userId = req.userId
    const title = req.body.title

    TodoModel.create({
        title,
       userId
    })
    res.json({
        userId: userId
    })
})


app.get('/todos',auth, async function(req,res){
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId:userId
    })
    res.json(
        {
            todos
        }
    )
})

app.listen(3000)