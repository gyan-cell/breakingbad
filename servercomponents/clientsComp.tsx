"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";

function NavElements() {
  const [navPhone, setnavPhone] = useState(false);
  return (
    <div className="navElements">
      <div
        className="icon"
        onClick={() => {
          setnavPhone(!navPhone);
        }}
      >
        {navPhone ? <HiOutlineX /> : <AiOutlineBars />}
      </div>
      <div className={navPhone ? "navLinksPhone" : "navLinks"}>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"#about"}>About</Link>
          </li>
          <li>
            <Link href={"#characters"}>Characters</Link>
          </li>
          <li>
            <Link href={"/episodes"}>Episodes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { NavElements };
