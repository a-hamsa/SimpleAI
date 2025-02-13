import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";
import { HiEye, HiEyeOff, HiHome } from "react-icons/hi";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    return strength;
  };

  useEffect(() => {
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);

    switch (strength) {
      case 0:
        setPasswordMessage("Very Weak");
        break;
      case 1:
        setPasswordMessage("Weak");
        break;
      case 2:
        setPasswordMessage("Fair");
        break;
      case 3:
        setPasswordMessage("Good");
        break;
      case 4:
        setPasswordMessage("Strong");
        break;
      case 5:
        setPasswordMessage("Very Strong");
        break;
      default:
        setPasswordMessage("");
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength < 3) {
      setError("Password is too weak. Please choose a stronger password.");
      return;
    }

    try {
      const response = await api.post("/Auth/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now login to your account!",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/login");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMessage =
        err.code === "ERR_NETWORK"
          ? "Unable to connect to the server. Please check your internet connection."
          : err.response?.data?.message ||
            err.message ||
            "Failed to register. Please try again.";

      setError(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
      });
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-blue-500";
      case 5: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <nav className="w-full p-4">
        <ul className="flex justify-end gap-6">
          <li>
            <Link to="/" className="text-white hover:text-yellow-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-yellow-300">
              Login
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4">
        <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/"
              className="p-1 sm:p-2 text-purple-600 hover:text-purple-800 transition-colors"
              title="Back to Home"
            >
              <HiHome size={20} className="sm:text-2xl" />
            </Link>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Register</h2>
            <div className="w-8 sm:w-10"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/75"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/75"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/75"
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
            {password && (
              <div className="mt-1">
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div
                    className={`h-full rounded-full transition-all ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1 text-gray-600">
                  Password Strength: <span className="font-medium">{passwordMessage}</span>
                </p>
              </div>
            )}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/75"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            
            {error && <div className="text-red-500 text-sm">{error}</div>}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              Register
            </button>
            
            <div className="text-center mt-4 text-sm sm:text-base">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-purple-600 hover:text-purple-800">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;