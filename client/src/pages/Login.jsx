import { useEffect, useState } from "react";
import video from '../assets/video.mp4';
import { Link, useNavigate} from 'react-router-dom';
import { toast } from "react-hot-toast";
import { login, authenticate } from "../helper/helper";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // State variables for server time and user's device time
  const [serverDateTime, setServerDateTime] = useState('');
  const [userDateTime] = useState(new Date());

  // Fetch server time from backend on component mount
  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/server'); // Replace with your server URL
        const data = await response.json();
        setServerDateTime(new Date(data.serverTime));
      } catch (error) {
        console.error('Error fetching server time:', error);
      }
    };

    fetchServerTime();
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Calculate the difference between server time and user's device time
    const dateTimeDifference = Math.abs(serverDateTime - userDateTime);
    const dateTimeThreshold = 500000; // Threshold in milliseconds

    if (dateTimeDifference > dateTimeThreshold) {
      toast.error('Please set your device time correctly before logging in.');
    } else {
      if (!password || !email) {
        toast.error('Please enter your credentials.');
        return;
      }

      try {
        let loginPromise = login(email, password);

        // Use react-hot-toast to show login progress
        toast.promise(loginPromise, {
          loading: "Logging in...",
          success: 'Logged in successfully',
          error: 'Something went wrong'
        });

        loginPromise.then((response) => {
          let { token } = response.data;
          localStorage.setItem("token", token);
          navigate('/home', { replace: true });
          window.location.reload();
          // navigate(0)
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      {/* Background video */}
      <div className="relative w-full h-full">
        <video
          src={video}
          type="video/mp4"
          loop
          muted
          controls={false}
          autoPlay
          className="w-full h-full object-cover"
        />
        {/* Login form overlay */}
        <div className="absolute flex flex-col justify-center top-0 left-0 right-0 bottom-0 bg-black/70">
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            {/* Login form */}
            <div className="sm:w-96 xs:w-80 p-6 m-auto rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-blue-600 lg:max-w-xl">
              <h1 className="lg:text-3xl font-semibold text-center text-blue-700 uppercase sm:text-xl">
                Login Here Please
              </h1>
              <form className="mt-6">
                {/* Email input */}
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white/80"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter Email"
                    className="block bg-white/70 w-full px-4 py-2 mt-2 text-black-700 border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 custom-placeholder"
                  />
                </div>
                {/* Password input */}
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white/80"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="block bg-white/70 w-full px-4 py-2 pr-10 mt-2 text-black-700 border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 custom-placeholder"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <BsFillEyeSlashFill className='text-black' />
                      ) : (
                        <BsFillEyeFill className='text-black' />
                      )}
                    </button>
                  </div>
                </div>
                {/* Forget password link */}
                <Link
                  to="/forgetpassword"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forget Password?
                </Link>
                {/* Login button */}
                <div className="mt-6">
                  <button
                    onClick={handleLogin}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                  >
                    Login
                  </button>
                </div>
              </form>
              {/* Sign up link */}
              <p className="mt-8 text-xs font-light text-center text-white/70">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
