import Image from "next/image";
import React from "react";
import image from "../../../public/ssa.png";
import Login from "@/servercomponents/Login";
import style from "../../../styles/Login.scss";
const Page = () => {
  return (
    <div className="loginContainer">
      <div className="loginFieldContainer">
        <Image
          src={image}
          alt="Image"
          fill
          className={style.rimg}
          style={{
            objectFit: "cover",
          }}
        />
        <div className="loginField">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Page;
