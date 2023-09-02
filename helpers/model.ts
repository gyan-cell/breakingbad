import mongoose from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const schema = new  mongoose.Schema<User>({
  name:{
    required:[true,"Please Enter The Name ..."],
    unique:true
  },
  email:{
    required:[true,"Please Enter The Email..."],
    unique:true
  },
  password:{
    required:[true,"Please Enter The Email..."],
    unique:true
  },
  isAdmin:{
  },
})

export const users = mongoose.models.user || mongoose.model("user",schema);
