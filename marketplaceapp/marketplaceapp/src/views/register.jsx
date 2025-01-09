import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../context/ContextProvider';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function Register() {
    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        setSuccess(null);
        setIsLoading(true);

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        try {
            const { data } = await axiosClient.post('/register', payload);
            setUser(data.user);
            setToken(data.token);
            setSuccess(data.message || 'Registration successful! Redirecting...');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 1500); // 1.5 seconds delay
        } catch (err) {
            if (err.response) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors({ general: [err.response.data.message || 'An unexpected error occurred. Please try again.'] });
                }
            } else {
                setErrors({ general: ['An unexpected error occurred. Please try again.'] });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-art-gallery-background.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6 z-10 animate-fadeIn">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900">Create Your Account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join our community to explore and share amazing art</p>
                </div>
                {success && (
                    <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
                        <p className="text-green-700 text-sm">{success}</p>
                    </div>
                )}
                {errors && (
                    <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                        {Object.keys(errors).map((key) => (
                            <p key={key} className="text-red-700 text-sm">
                                {errors[key][0]}
                            </p>
                        ))}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            ref={nameRef}
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600"
                            placeholder="Username"
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 origin-left"
                        >
                            Username
                        </label>
                        <FaUser className="absolute right-3 top-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            ref={emailRef}
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600"
                            placeholder="Email address"
                        />
                        <label
                            htmlFor="email-address"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 origin-left"
                        >
                            Email Address
                        </label>
                        <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            ref={passwordRef}
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600"
                            placeholder="Password"
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 origin-left"
                        >
                            Password
                        </label>
                        <FaLock className="absolute right-3 top-3 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-10 top-3 text-gray-400 focus:outline-none"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            ref={passwordConfirmationRef}
                            id="password-confirmation"
                            name="password_confirmation"
                            type={showPassword ? "text" : "password"}
                            required
                            className="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600"
                            placeholder="Confirm Password"
                        />
                        <label
                            htmlFor="password-confirmation"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 origin-left"
                        >
                            Confirm Password
                        </label>
                        <FaLock className="absolute right-3 top-3 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-10 top-3 text-gray-400 focus:outline-none"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 ${
                                isLoading ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
