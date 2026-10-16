
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../config/api';

// Main Login component
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Handle login form submission
const handleLogin = async (e) => {
  e.preventDefault();

  setErrorMessage('');

  const trimmedEmail = email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedEmail) {
    setErrorMessage('Please enter your email address.');
    return;
  }

  if (!emailPattern.test(trimmedEmail)) {
    setErrorMessage('Please enter a valid email address.');
    return;
  }

  if (!password.trim()) {
    setErrorMessage('Please enter your password.');
    return;
  }

  // API call starts only after validation succeeds
  setIsLoading(true);

  try {
    const { data } = await axios.post(
      `${API_URL}/api/users/login`,
      {
        email: trimmedEmail,
        password,
      }
    );

    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('userId', data.userId);

    if (data.role === 'admin') {
      navigate('/admin-panel');
    } else if (data.role === 'organizer') {
      navigate('/organizer-dashboard');
    } else {
      navigate('/home');
    }
  } catch (err) {
    setErrorMessage(
      err.response?.data?.message ||
      'Login failed. Please check your email and password.'
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('poster bg login.jpg')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 z-10 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-x-1 transition-transform"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>

        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Login Form Card */}
      <div className="relative bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Sign in to access your EventEase account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6" noValidate>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage('');
                }}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Validation and Login Error Message */}
          {errorMessage && (
  <p
    role="alert"
    className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
  >
    {errorMessage}
  </p>
)}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 ${
              isLoading
                ? 'opacity-70 cursor-not-allowed'
                : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>

                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?

            <Link
              to="/signup"
              className="text-black font-bold hover:underline ml-1"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
