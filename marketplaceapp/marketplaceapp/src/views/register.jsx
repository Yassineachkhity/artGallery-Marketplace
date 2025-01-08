import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../context/ContextProvider';

export default function Register() {
    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        setSuccess(null);
    
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
    
        try {
            const { data } = await axiosClient.post('/register', payload);
            console.log('Registration Response:', data); // Debugging
            setUser(data.user);
            setToken(data.token);
            setSuccess(data.message || 'Registration successful!');
    
            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 1500); // 1.5 seconds delay
        } catch (err) {
            console.error('Registration Error:', err); // Debugging
            if (err.response) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else {
                    // Display detailed error message from backend
                    setErrors({ general: [err.response.data.message || 'An unexpected error occurred. Please try again.'] });
                }
            } else {
                setErrors({ general: ['An unexpected error occurred. Please try again.'] });
            }
        }
    };
    
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                {success && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <p className="text-green-700">{success}</p>
                </div>
                )}
                {errors && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        {Object.keys(errors).map((key) => (
                            <p key={key} className="text-red-700">{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                ref={nameRef}
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                ref={emailRef}
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                ref={passwordRef}
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-confirmation" className="sr-only">Confirm Password</label>
                            <input
                                ref={passwordConfirmationRef}
                                id="password-confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
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