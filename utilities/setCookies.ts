import { setCookie } from "cookies-next";
import { NextApiResponse } from "next";

const cookieSetter = (
  res: NextApiResponse,
  token: string,
  set: boolean,
) => {
  setCookie("token", set ? token : "", {
    path: "/",
    httpOnly: true,
    maxAge: set ? 30 * 24 * 60 * 60 * 1000 : 0,
  });
};

export default cookieSetter;

