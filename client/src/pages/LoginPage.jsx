import { useContext, useState } from 'react'
import logoBig from '../assets/logo-big.png'
import arrowIcon from '../assets/arrow.png'
import { AuthContext } from '../../context/AuthContext'


export default function LoginPage() {

    const [currState, setCurrState] = useState("Sign up")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [isDataSubmitted, setisDataSubmitted] = useState(false)

    const { login } = useContext(AuthContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (currState === 'Sign up' && !isDataSubmitted) {
            setisDataSubmitted(true)
            return
        }

        login(currState==="Sign up" ? "signup" : 'login',{fullName, email,password,bio}) // call api
    }

    return (
        <div className="min-h-screen flex flex-col sm:flex-row">
            <div className="flex-1 bg-black flex items-center justify-center">
                <img src={logoBig} alt="" className="w-[min(30vw,250px)]" />
            </div>

            <div className="flex-1 bg-white flex items-center justify-center">
                <form
                    onSubmit={onSubmitHandler}
                    action=""
                    className="border-2 bg-white text-black border-gray-300 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
                >
                    <h2 className="font-medium text-2xl flex justify-between items-center">
                        {currState}
                        {isDataSubmitted && (
                            <img
                                onClick={() => setisDataSubmitted(false)}
                                src={arrowIcon}
                                alt=""
                                className="w-5 cursor-pointer"
                            />
                        )}
                    </h2>

                    {currState === "Sign up" && !isDataSubmitted && (
                        <input
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                            type="text"
                            className="p-2 border border-gray-500 rounded-md focus:outline-none"
                            placeholder="Full Name"
                            required
                        />
                    )}

                    {!isDataSubmitted && (
                        <>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Email"
                                required
                                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                                required
                                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </>
                    )}

                    {currState === "Sign up" && isDataSubmitted && (
                        <textarea
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                            rows={4}
                            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Introduce yourself..."
                            required
                        ></textarea>
                    )}

                    <button className="py-3 bg-linear-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">
                        {currState === "Sign up" ? "Create Account" : "Login Now"}
                    </button>

                    {currState === "Sign up" && isDataSubmitted && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <input type="checkbox" required />
                            <p>I understand this is a demo app and my data may be deleted.</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        {currState === "Sign up" ? (
                            <p className="text-sm text-black">
                                Already have an account?{" "}
                                <span
                                    onClick={() => {
                                        setCurrState("Login");
                                        setisDataSubmitted(false);
                                    }}
                                    className="font-medium text-violet-500 cursor-pointer"
                                >
                                    Login here
                                </span>
                            </p>
                        ) : (
                            <p className="text-sm text-black">
                                Create an account{" "}
                                <span
                                    onClick={() => {
                                        setCurrState("Sign up");
                                    }}
                                    className="font-medium text-violet-500 cursor-pointer"
                                >
                                    Click here
                                </span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )

}