import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../context/ContextProvider';

export default function Login() {
    const navigate = useNavigate();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            console.log('Attempting login with:', { email: payload.email });
            const { data } = await axiosClient.post('/login', payload);
            console.log('Login response:', data);
            setUser(data.user);
            setToken(data.token);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err.response || err);
            if (err.response) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else if (err.response.status === 401) {
                    setErrors({ email: ['Invalid credentials'] });
                } else {
                    setErrors({ 
                        email: [`Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`] 
                    });
                }
            } else if (err.request) {
                setErrors({ email: ['Network error - Could not reach the server'] });
            } else {
                setErrors({ email: ['An unexpected error occurred'] });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
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
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                ref={emailRef}
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}