import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";
import { HiEye, HiEyeOff, HiHome } from "react-icons/hi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/Auth/login", {
        username,
        password,
      });
      console.log(response)

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAuthenticated", "true");

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/chat");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Login Error:", err);
      const errorMessage =
        err.code === "ERR_NETWORK"
          ? "Unable to connect to the server. Please check your internet connection."
          : err.response?.data?.message ||
            err.message ||
            "Failed to login. Please try again.";

      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors"
            title="Back to Home"
          >
            <HiHome size={20} className="sm:text-2xl" />
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Login</h2>
          <div className="w-8 sm:w-10"></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          <div className="text-center mt-4 text-sm sm:text-base">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
