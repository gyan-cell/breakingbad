import { NextApiRequest } from "next";
import { User } from "./User";
import Jwt from "jsonwebtoken";
const checkAuth = async (req: NextApiRequest) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return null;
  } else {
    const token = cookie.split("=")[1];
    const decoded = Jwt.verify(token, process.env.JWT_SECRET as string);
    return await User.findById(decoded._id);
  }
};

export default checkAuth;
