// import { connectMongoDB } from "../../../../../lib/mongodb";
// import User from "../../../../../models/users";
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from 'uuid';

// function generateSessionId() {
//     return uuidv4();
// }

// export default handleSignIn = async (email, password) => {
//     try {
//         const db = await connectMongoDB();
//         const user = await User.findOne({ email });
    
//         if (!user) {
//           return null; // Return null when user is not found
//         }
//         const passwordsMatch = await bcrypt.compare(password, user.password);
    
//         if (!passwordsMatch) {
//             console.log("Passwords did not match");
//           return null; // Return null when passwords do not match
//         }
    
//         let sessionId = user.sessionId;
//         if (!sessionId) {
//           sessionId = generateSessionId();
//         }
    
//         const resFlask = await fetch("https://journeyai.azurewebsites.net/login", {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//             },
//               body: JSON.stringify({ 'session_id' : sessionId}),
//           });
    
//         if (resFlask.ok) {
//           console.log("it was done");
//         }
//         else {
//           console.log("There was an error authenticating the back-end")
//           return null;
//         }
    
//         // Return the user object when authentication is successful
//         // Create a new object with user data and sessionId
//         const userObject = {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             sessionId: sessionId
//           };
//           return userObject;
    
//         } catch (error) {
//             console.log("Error: ", error);
//             return null; // Return null in case of an error       
//     }
// }