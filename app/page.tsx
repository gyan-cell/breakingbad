import Image from "next/image";
import styles from "./page.module.css";
import HeroPage from "@/components/HeroPage";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function Home() {
   const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (<HeroPage />);
}
