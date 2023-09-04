import { registerSchema } from "@/helpers/AuthValidationSchema";
import ErrorReporter from "@/helpers/ErrorReporters";
import connectDb from "@/helpers/connectDb";
import { User } from "@/helpers/model";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface UserPayload {
  email: string;
  name: string;
  password: string;
}
connectDb();
export async function POST(request: NextRequest) {
  try {
    const body: UserPayload = await request.json();
    console.log(1);
    
    vine.errorReporter = () => new ErrorReporter();
    console.log(2);
    const validator = vine.compile(registerSchema);
    console.log(3);
    // const output = await validator.validate(body);
    // const output = await validator.validate(body);
    console.log(4);
    try {
      const user = await User.findOne({ email: body.email });
      if (user) {
        return NextResponse.json(
          {
            error: "User Already Exisits With This Email...",
            status: 400,
          },
          { status: 400 },
        );
      } else {
        const hasher = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, hasher);
        await User.create(body);
        return NextResponse.json(
          {
            msg: "User Created SuccessFully...",
            status: 200,
          },
          { status: 200 },
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          error: error,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        {
          errors: error.message,
        },
        { status: 200 },
      );
    }
  }
}
