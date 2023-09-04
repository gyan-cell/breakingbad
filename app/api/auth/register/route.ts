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
    vine.errorReporter = () => new ErrorReporter();
    const validator = vine.compile(registerSchema);
    const output = await validator.validate(body);
    try {
      const user = await User.findOne({ email: output.email });
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
        output.password = bcrypt.hashSync(output.password, hasher);
        await User.create(output);
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
