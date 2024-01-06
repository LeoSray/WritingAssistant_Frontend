import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/users";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

function generateSessionId() {
  return uuidv4();
}

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          // username: { label: 'Username', type: 'text' },
          // password: {  label: 'Password', type: 'password' }
        },
        async authorize(credentials, req)  {
          const email = credentials.email;
          const password = credentials.password;
          try {
            const db = await connectMongoDB();
            const user = await User.findOne({ email });

            if (!user) {
              return null; // Return null when user is not found
            }
            const passwordsMatch = await bcrypt.compare(password, user.password);
  
            if (!passwordsMatch) {
                console.log("Passwords did not match");
              return null; // Return null when passwords do not match
            }

            let sessionId = user.sessionId;
            if (!sessionId) {
              sessionId = generateSessionId();
            }

            const resFlask = await fetch("http://127.0.0.1:8080/login", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
                  body: JSON.stringify({ 'session_id' : sessionId}),
              });

            if (resFlask.ok) {
              console.log("it was done");
            }
            else {
              console.log("There was an error authenticating the back-end")
              return null;
            }

            // Return the user object when authentication is successful
            // Create a new object with user data and sessionId
            const userObject = {
              _id: user._id,
              name: user.name,
              email: user.email,
              sessionId: sessionId
            };
            return userObject;

          } catch (error) {
            console.log("Error: ", error);
            return null; // Return null in case of an error
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user?._id) {
          token._id = user._id;
          token.sessionId = user.sessionId; // store sessionId in token
        }
        return token;
      },
      async session({ session, token}) {
        if (session.user) {
          const user = await User.findOne({ email: session.user.email });
          session.user = user.name; // Update the session user object
          session.email = user.email;
          session.userId = user.id;
          session.sessionId = token.sessionId;
        }
        return session;
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 4 * 60 * 60, // 4 hours in seconds
      updateAge: 5 * 60, // 5 minutes in seconds
    },
    pages: {
      signIn: "/login",
    },
  };
  
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };