"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [userState, setUserState] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setError] = useState<registerErrorType>({});

  const submitForm = async () => {
    setLoading(true);
    console.log("The payload is", userState);
    axios
      .post("/api/auth/register", userState)
      .then((res) => {
        setLoading(false);
        console.log("The response is", res.data);
        const response = res.data;
        if (response.status == 200) {
          router.push(`/login?message=${response.msg}`);
        } else if (response?.status == 400) {
          setError(response?.errors);
        } else {
          setError({});
        }
      })
      .catch((err) => console.log("The error is", err));
  };

  // * Github signin
  const githubSignIn = () => {
    signIn("github", {
      callbackUrl: "/",
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Full Name"
        id="name"
        onChange={(e) => setUserState({ ...userState, name: e.target.value })}
      >
      </input>
      <input
        type="email"
        placeholder="Email"
        id="email"
        onChange={(e) => setUserState({ ...userState, email: e.target.value })}
      >
      </input>
      <input
        type="password"
        placeholder="Password"
        id="password"
        onChange={(e) => setUserState({ ...userState, password: e.target.value })}
      >
      </input>
      <button onClick={submitForm} >Submit</button>
      <button onClick={githubSignIn} >With  Github Register</button>
    </div>
  );
};

export default page;
