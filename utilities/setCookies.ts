import { serialize } from "cookie";
import { NextApiResponse } from "next";
// import { serialize } from "cookie";

  export const cookieSetter = (res:NextApiResponse, token:string, set:boolean) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};
