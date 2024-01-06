'use client';
import '../app/globals.css';

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false); // Add loading state

    return (
        <section className='relative flex w-screen h-screen mx-auto items-center justify-center bg-bgLight'>
            
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
                        <form className="relative flex flex-col items-center px-8 pt-8 pb-10 space-y-7" action="#" onSubmit={handleSubmit}>
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

                            {/* Login button */}
                            <div className="flex justify-center pt-2">
                                {isLoading ? (
                                    <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-bgLight" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                ) : (
                                    <button type="submit" className="flex w-[150px] justify-center items-center text-center bg-white  text-black hover:bg-bgLight 
                                                                    rounded-lg text-sm font-bold px-5 py-2">
                                        Login
                                    </button>
                                )}
                            </div>

                            {/* Error message pops up for invalid credentials or any other errors */}
                            {error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 mx-auto">
                                {error}
                            </div>
                            )}

                            {/* Register link */}
                            <div className="flex flex-col items-center justify-center text-sm font-bold text-white sm:pt-2 lg:flex-row lg:items-baseline">
                                Dont have an account? <a href="/register" className="flex items-center justify-centerfont-bold ml-2 text-[#8077FF] hover:underline md:ml-2 md:mt-0">Register here</a>
                            </div>

                            {/* Forgot password div */}
                            <div className="flex justify-center text-sm font-bold text-white">
                                <a href="/" className="font-medium text-primary-600 dark:text-primary-500 hover:text-bgLight">Forgot Password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginCard;