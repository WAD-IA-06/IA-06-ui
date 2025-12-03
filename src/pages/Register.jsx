import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      const response = await authAPI.register({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });

      setSuccessMessage(response.message || 'Registration successful! Redirecting to login...');
      console.log('Response:', response);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              MyApp
            </Link>
            
            <div className="flex gap-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-300 hover:text-primary-400 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-black"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sign Up Form */}
      <div className="flex items-center justify-center px-4 py-12" style={{minHeight: 'calc(100vh - 64px)'}}>
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-400 mt-2">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Fullname Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.fullname 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-700 focus:border-primary-500 focus:ring-primary-500/50'
                }`}
                {...register('fullname', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Full name must be at least 2 characters',
                  },
                })}
              />
              {errors.fullname && (
                <p className="mt-1 text-sm text-red-400">{errors.fullname.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-700 focus:border-primary-500 focus:ring-primary-500/50'
                }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-700 focus:border-primary-500 focus:ring-primary-500/50'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.confirmPassword 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-700 focus:border-primary-500 focus:ring-primary-500/50'
                }`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Error Message */}
            {apiError && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {apiError}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/50"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}