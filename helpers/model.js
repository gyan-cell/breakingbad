import mongoose, { Schema } from "mongoose";


const schema = new Schema({
  name:{
    type:String,
    required:[true,"Please Enter The Name ..."],
    unique:true
  },
  email:{
    type:String,
    required:[true,"Please Enter The Email..."],
    unique:true
  },
  password:{
    type:String,
    required:[true,"Please Enter The Email..."],
    unique:true
  },
  isAdmin:{
    type:Boolean
  },
})

const users = mongoose.models.user || mongoose.model("user",schema);
export default users;
