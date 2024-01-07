// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../../../lib/firebase/'; // Adjust the path

// const handleRegister = async (email, password, name, otherData) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const firebaseUser = userCredential.user;

//     // Now send the additional data to your API
//     const response = await fetch('/api/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ 
//         firebaseUid: firebaseUser.uid, 
//         name, 
//         email,
//         // Include other data fields as necessary
//       }),
//     });

//     const data = await response.json();
//     // Handle the response
//   } catch (error) {
//     // Handle errors
//   }
// };

// import { connectMongoDB } from "../../../../lib/mongodb";
// import User from "../../../../models/users";
// import { NextResponse } from "next/server";
// import bcrypt from 'bcrypt';

// export async function POST(req) {
//   try {
//     const { id, name, email, password } = await req.json();
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await connectMongoDB();
//     await User.create({id, name, email, password: hashedPassword});
//     console.log("Registering user")
//     console.log(id, name, email, password)
//     return NextResponse.json({ message: "User registered." }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "An error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// }