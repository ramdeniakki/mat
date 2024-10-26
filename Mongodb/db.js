const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const users = new Schema({
    email:String,
    password:String,
    name:String
})

const todo  = new Schema({
    title:String,
    done:Boolean
})

const UserModel = mongoose.model("user",users);
const Todomodel = mongoose.model("todo",todo);

module.exports = {
    UserModel:UserModel,
    Todomodel:Todomodel
}