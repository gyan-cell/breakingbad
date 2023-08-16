import Image from "next/image";
import React from "react";
import image from "../public/logo1.png";
import { NavElements } from "@/servercomponents/clientsComp";
import "../styles/navbar.scss";
const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <span></span>Breaking <span></span>Bad.
      </div>
      <NavElements />
    </nav>
  );
};

export default Navbar;
