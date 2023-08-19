import {  NextApiResponse } from "next";
import {  NextRequest, NextResponse } from "next/server";


function cookieSetter(req:NextRequest,res:NextApiResponse,token:string,set:boolean){
  const response = NextResponse.next();
  return response.cookies.set('token',token,{
    path:'/',
    httpOnly:true,
    maxAge:set ? 30*24*60*60*1000 : 0
  })
}



export default cookieSetter;

