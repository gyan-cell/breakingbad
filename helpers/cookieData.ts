import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const cookieData = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


// On Line Five ?. is A Optional Chaining OPerator To Acccess The Value Property Of Cookie 
// If It Is Not Present Then By Default It Sets The Value TO Empty String
//  The ! operator is used to assert that this environment variable is defined. 
//  It's important to ensure that you have set this environment variable
//  with a valid JWT secret before running this code.
