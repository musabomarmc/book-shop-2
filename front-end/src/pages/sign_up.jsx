import React, { useState } from 'react'
import { FaRegUser, FaUserTie } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { AlertCircle, X, EyeOff, Eye } from "lucide-react";
import { useApi } from '../context/api.context';

const Sign_up = () => {
    const navigate = useNavigate();
    const { Registration } = useApi()


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        comfirm_password: ""
    })

    const [error, setError] = useState("")
    const [showPassword, setShowpassword] = useState(false)
    const [showComfirmPassword, setShowComfirmPassword] = useState(false)

    const [isloading, setIsloading] = useState(false)

    const validatefOrm = () => {
        if (!formData.username || formData.username.trim().length < 3) {
            return "userName must be at least 3 character long"
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!formData.email || !emailRegex.test(formData.email)) {
            return "please enter a valid email address"
        }

        if (!formData.password || formData.password.length < 8) {
            return "password must be at least 8 characters long"
        }
        if (formData.password !== formData.comfirm_password) {
            return "password do not match"
        }
        return null
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validatefOrm();
        if (validationError) {
            setError(validationError);
            console.log("validationError:", validationError)
        } else {
            setError("")
            setIsloading(true)
            try {
                const SignUpData = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
                Registration(SignUpData)
                console.log("sing up was seccessfully")
                navigate("/sign-in")
            } catch (error) {
                console.log("rigistration Error:", error.message)
                setError(error.message || "Rigistration failed. Please try again", error.message)
            }
        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gray-50'>
            <div className='w-full max-w-lg'>
                {/*header*/}
                <div className='text-center mb-6 md:mb-8'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg mb-4'>
                        <FaRegUser className='h-8 w-8 text-white' />
                    </div>

                    <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900'>
                        create an acount
                    </h1>

                    <p className='text-gray-500 mt-2 text-sm'>
                        get started with your free account
                    </p>
                </div>
                {/*sign up from*/}
                <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>

                    {error && (
                        <div className="bg-red-50 boder-1-4 boder-red-500 p-4 m-6 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex item-center">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                    <div className="ml-2">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setError("")}
                                    className="text-red-400 hover:text-red-600 transition"
                                    type="button"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className='p-6 sm:p-8'>
                        <form onSubmit={handleSubmit} method='post' className='space-y-5'>
                            {/*username*/}
                            <div>
                                <label
                                    className='block text-sm font-semibold text-gray-700 mb-1.5'
                                    htmlFor='username'
                                >
                                    user name
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <FaUserTie />
                                    </div>

                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        placeholder='Enter your user name'
                                        value={formData.username}
                                        onChange={(e) => {
                                            setFormData({ ...formData, [e.target.name]: e.target.value })
                                        }}
                                        className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'
                                    />
                                </div>
                            </div>

                            {/*email*/}
                            <div>
                                <label
                                    className='block text-sm font-semibold text-gray-700 mb-1.5'
                                    htmlFor='email'
                                >
                                    Email address
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center'>
                                        <MdOutlineMail />
                                    </div>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='example@gmail.com'
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, [e.target.name]: e.target.value })
                                        }}
                                        className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'

                                    />

                                </div>
                            </div>
                            {/*password*/}
                            <div>
                                <label
                                    className='block text-sm font-semibold text-gray-700 mb-1.5'
                                    htmlFor='password'
                                >
                                    password
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center'>
                                        <RiLockPasswordLine />
                                    </div>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id='password'
                                        name='password'
                                        placeholder='Enter your username'
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, [e.target.name]: e.target.value })
                                        }}
                                        className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'

                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowpassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition cursor-pointer"
                                    >
                                        {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                    </button>

                                </div>
                                use a strong password
                                <p className="text-xs text-gray-400 mt-1.5">

                                </p>

                            </div>

                            {/*comfrim password*/}
                            <div>
                                <label
                                    className='block text-sm font-semibold text-gray-700 mb-1.5'
                                    htmlFor='comfirm_password'
                                >
                                    comfirm password
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center'>
                                        <RiLockPasswordLine />
                                    </div>

                                    <input
                                        type={showComfirmPassword ? "text" : "password"}
                                        id='comfirm_password'
                                        name='comfirm_password'
                                        placeholder='re_enter your password'
                                        value={formData.comfirm_password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, [e.target.name]: e.target.value })
                                        }}
                                        className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none'

                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowComfirmPassword(!showComfirmPassword)}

                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition cursor-pointer"
                                    >
                                        {showComfirmPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                    </button>

                                </div>
                                <p className="text-xs text-gray-400 mt-1.5">
                                    Confirm your password
                                </p>
                            </div>

                            {/*bottom*/}
                            <button
                                type="submit"
                                className='w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700'
                            >
                                Create Account
                            </button>
                        </form>

                        {/*sign in link*/}
                        <div className='bg-gray-50 px-6 py-4 border-t border-gray-100 text-center'>
                            <p className='text-sm text-gray-600'>
                                Already have an account?
                                <Link to="/sign-in"
                                    className='font-semibold text-indigo-600 hover:text-indigo-800'
                                >
                                    sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sign_up
