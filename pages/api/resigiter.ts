import { User } from "@/utilities/User";
import { connectDb } from "@/utilities/connectDb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import generatToken from "@/utilities/createTokens";
import { cookieSetter } from "@/utilities/setCookies";
export default async function handler(req:NextApiRequest,res:NextApiResponse):Promise<void>{
  if (req.method!=="POST") {
    res.status(404).json({
      maessage:"Plz Use Valid Methods.."
    })
  }
  else{
    await connectDb();
    const { name , email , password } = req.body;
    let user = await User.findOne({email});
    if (user) {
      res.status(400).json({
        massage : "User Already Exists With That Email",
      })
    }
    else{
      try {
      const hashedPassword = await bcrypt.hash(password,10);
      const  user = User.create({email,name,password:hashedPassword});
        const token = generatToken(user._id);
        cookieSetter(res,token,true)  ;
        return res.status(200).json({
          message:"User Created SuccessFully",
          user
        })
      } catch (error) {
        return res.status(200).json({
          message:"User Could Not Be Created",
          error
        })
      }
    }
  }
}
