import jwt from "jsonwebtoken";

const generatToken = (_id: string): string => {
  try {
    const decoded = jwt.sign({ _id }, process.env.JWT_SECRET as string, {
      expiresIn: "12 days",
    });
    return decoded;
  } catch (error) {
    console.log(error);
    return `${error}`;
  }
};
export default generatToken;
