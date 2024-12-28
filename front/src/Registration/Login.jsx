import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mehdi-technology-backend.vercel.app/user/login",
        formData
      );
      setMessage(response.data.message);

      if (response.data.message === "Login successful") {
        localStorage.setItem("isAuthenticated", "true");

        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response.data.message || "Error signing up");
    }
  };

  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col border p-8 w-96"
      >
        <h2 className="text-cyan-300">Login</h2>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex items-center gap-3">
          <button
            type="submit"
            className="px-2 w-40 py-2 border border-cyan-300 text-white hover:bg-[#1a1b1b] rounded"
          >
            Login
          </button>
          <Link to={"/"} className="underline text-cyan-500 w-full">
            Dont have an account?
          </Link>
        </div>
        {message && (
          <div className="mt-8 text-center">
            <p className="text-cyan-400">{message}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
