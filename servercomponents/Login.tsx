"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
const Login = () => {
  const searchParams = useSearchParams();
  const [loading, setloading] = useState<boolean>(false);
  const [errors, seterrors] = useState<LoginErrorType>();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  console.log(authData);
  const submitForm = async () => {
    setloading(true);
    axios.post("/api/auth/login", authData).then((res) => {
      setloading(false);
      const response = res.data;
      console.log("The response Is ", response);
      if (response.status == 200) {
        console.log("The Logged In User IS ", response);
        signIn("credentials", {
          email: authData.email,
          password: authData.password,
          callbackUrl: "/",
          redirect: true,
        });
      } else if (response.error == 400) {
        seterrors(response?.errors);
      }
    }).catch((err) => {
      setloading(false);
      console.log("Error Is ", err);
    });
  };
  const githubSignIn = async ()=>{
    await signIn("github",{
      callbackUrl:"/",
      redirect:true
    })
  }
  return (
    <div className="head">
      <div className="headForm">
        <h1>Welcome Back Bitch!!!</h1>
        <form>
          <label htmlFor="email">Please Enter The Email...</label>
          <input type="email" placeholder="Email!!!" onChange={(e)=>{
            setAuthData({...authData,email:e.target.value})
          }}></input>
          <label htmlFor="password">Please Enter The Password</label>
          <input type="password" placeholder="Password" onChange={(e)=>{
            setAuthData({...authData,password:e.target.value})
          }}  ></input>
          <span>{errors?.email}</span>
          <button type="button" onClick={submitForm} >Submit</button>
          <button type="button" onClick={githubSignIn} >
            Log In With <AiFillGithub /> Github!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
