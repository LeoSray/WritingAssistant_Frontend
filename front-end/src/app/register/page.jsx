'use client';
import { useState } from 'react';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';


export default function page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
          setError("All fields are required.");
          return;
        }
    
        // Hello
        try {
          const resUserExists = await fetch("api/userExists", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
    
          const { user } = await resUserExists.json();
    
          if (user) {
            setError("User already exists.");
            return;
          }
    
          // generate random id for new user
          // const cryptoId = crypto.randomUUID();
          // const _id = cryptoId.replace(/-/g, '');
          const id = uuidv4().replace(/-/g, '');

          const res = await fetch("https://journeyai.azurewebsites.net/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          });
    
          if (res.ok) {
            const form = e.target;
            form.reset();
            router.replace("/login");
          } else {
            console.log("User registration failed.");
          }
        } catch (error) {
          console.log("Error during registration: ", error);
        }
      };
    return (
        <section className='relative flex w-screen h-screen mx-auto items-center justify-center bg-bgLight'>
            
            {/*  Image on left testing before it was lg:w-1/2*/}
            <div className="w-full customBg h-screen z-0 opacity-40 md:min-h-screen md:opacity-100 lg:w-1/2 xl:w-full xl:z-10">
            </div>

            {/* Login Container */}
            <div className='absolute flex w-full min-h-screen items-center justify-center z-1 md:relative md:w-2/3 md:p-12 md:px-28 lg:w-2/3 xl:w-2/3'>
                
                {/* Login box */}
                <div className="flex justify-center items-center h-full bg-loginBoxLight customBorder
                                rounded-lg md:w-max-full lg:w-full xl:w-full xl:-translate-x-[45%]">
                    <div className="p-12 px-18 md:space-y-6">
                        <h1 className="flex flex-col text-white text-center font-extrabold text-4xl">
                            Journey AI
                        </h1>
                        
                        {/* Styles for form effect username and password text and input box */}
                        <form className="relative flex flex-col items-center px-8 pt-8 pb-8 space-y-7" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="flex mb-2 text-sm font-bold text-white ">Username:</label>                        
                                <input onChange={(e) => setName(e.target.value)} type="username" name="name" id="name" className="bg-white border-solid border-[3px] border-borderColor 
                                focus:outline-none rounded-full block min-w-full py-2 px-4 text-gray-900 sm:text-sm md:w-[300px]" placeholder="Enter your Username..." required/>
                            </div>
                            <div>
                                <label htmlFor="email" className="flex mb-2 text-sm font-bold text-white ">Email:</label>                        
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-white border-solid border-[3px] border-borderColor 
                                focus:outline-none rounded-full block min-w-full py-2 px-4 text-gray-900 sm:text-sm md:w-[300px]" placeholder="Enter your Email..." required/>
                            </div>
                            <div>
                                <label htmlFor="password" className="flex mb-2 text-sm font-bold text-white">Password:</label>                        
                                {/* </div><input type="password" name="password" id="password" autoComplete="new-password" className="bg-white border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="password..." required/> */}
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" autoComplete="new-password" className="bg-white border-solid border-[3px] border-borderColor
                                focus:outline-none rounded-full block min-w-full py-2 px-4 text-gray-900 sm:text-sm md:w-[300px]" placeholder="Enter your Password..." required/>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="flex mb-2 text-sm font-bold text-white">Confirm Password:</label>                        
                                {/* </div><input type="password" name="password" id="password" autoComplete="new-password" className="bg-white border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="password..." required/> */}
                                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="bg-white border-solid border-[3px] border-borderColor
                                focus:outline-none rounded-full block min-w-full py-2 px-4 text-gray-900 sm:text-sm md:w-[300px]" placeholder="Confirm Password..." required/>
                            </div>

                            {/* Login button */}
                            <div className="flex justify-center pt-2">
                                <button type="submit" className="flex w-[150px] justify-center items-center text-center bg-white  text-black hover:bg-bgLight 
                                rounded-lg text-sm font-bold px-5 py-2">
                                    Register
                                </button>
                            </div>

                            {/* Error message pops up for invalid credentials or any other errors */}
                            {error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 mx-auto">
                                {error}
                            </div>
                            )}

                            {/* Register link */}
                            <div className="flex flex-col items-center justify-center text-sm font-bold text-white sm:pt-2 lg:flex-row lg:items-baseline">
                                Already have an account? <a href="/login" className="flex items-center justify-centerfont-bold ml-2 text-[#8077FF] hover:underline md:ml-2 md:mt-0">Login here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}



