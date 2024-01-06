import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/users";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { id, name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({id, name, email, password: hashedPassword});
    console.log("Registering user")
    console.log(id, name, email, password)
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}