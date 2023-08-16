import React from "react";
import styles from "../styles/HeroPage.scss";
import "../styles/HeroPage.scss";
import img from "../public/walter.jpg";
import img1 from "../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
const HeroPage = () => {
  return (
    <div className="hero">
      <Image src={img} alt="Hero" fill className={styles.image} />
      <div className="content">
        <div className="hero1">
          <h1>
            <span>I</span> <span> Am </span> <span>Walter </span>White.
          </h1>
          <p>
            "Breaking Bad" is a television series that chronicles the
            transformation of a high school chemistry teacher into a ruthless
            methamphetamine manufacturer and drug lord.
          </p>
          <p>I am Thinking Maybe You And I Could Partner Up..</p>
          <p>You , You Wanna Cook Crystal Meth ?</p>
          <div className="btns">
            <button>
              <Link href={"/seasons"}>Seasons</Link>
            </button>
            <button>
              <Link href={"/skyler"}>Reasons To Despise Skyler</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
