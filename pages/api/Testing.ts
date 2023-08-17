import { connectDb } from "@/utilities/connectDb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const connection = await connectDb();
  if (req.method !== "GET") {
    res.status(400).json({
      message: "DataBase Is NoT Working Working",
    });
  } else {
    res.status(200).json({
      message: "DataBase Is Working",
      connection,
    });
  }
}
