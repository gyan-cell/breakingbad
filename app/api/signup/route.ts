import connectDb from "@/helpers/connectDb";
import { users } from "@/helpers/model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    const user = await users.findOne(email);

    if (user) {
      return NextResponse.json(
        { error: "User Already Exists...." },
        {
          status: 404,
        },
      );
    }

    const hasher = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hasher);
    const newUser = new users({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json(
      {
        message: "User Created Successfully",
        success: true,
        savedUser,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    console.log(error.message);
  }
}
