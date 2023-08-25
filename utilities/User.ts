import mongoose, { Schema, model } from "mongoose";

interface UserTypes{
  name:string,
  email : string,
  password : string,
  forgotPasswordToken:String,
  forgotPasswordTokenExpiry:Date,
  verifyToken : String,
  verifyTokenExpiry :Date 
}

const schema  = new Schema<UserTypes>({
  name:{
    type:String,
    required:[true,"Please Enter Your Name !"]
  },
  email:{
    type:String,
    required:[true,"Please Enter Your Email!"]
  },
  password:{
    required:[true,"Please Enter Your Password!"],
    type:String
  },
  forgotPasswordToken:String,
  forgotPasswordTokenExpiry:String,
  verifyToken:String,
  verifyTokenExpiry:Date
})

export const User = mongoose.models.User || model<UserTypes>('User',schema);
