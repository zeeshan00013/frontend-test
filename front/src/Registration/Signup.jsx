import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to store error or success messages
  const [message, setMessage] = useState("");

  // Initialize the navigate function
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mehdi-technology-backend.vercel.app/user/signup",
        formData
      );
      setMessage(response.data.message); // Display success message

      // If signup is successful, navigate to the login page
      if (response.data.message === "User registered successfully") {
        setTimeout(() => {
          navigate("/login"); // Navigate to login page after a short delay
        }, 2000); // 2-second delay for the user to see the success message
      }
    } catch (error) {
      setMessage(error.response.data.message || "Error signing up"); // Display error message
    }
  };

  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col border p-8 w-96"
      >
        <h2 className="text-cyan-300">Signup</h2>
        <div>
          <label htmlFor="name" className="block text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
          />
        </div>

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
            Sign Up
          </button>
          <Link to={"/login"} className="underline text-cyan-500 w-full">
            Already have an account?
          </Link>
        </div>
      </form>

      {message && (
        <div className="mt-4 text-center">
          <p className="text-cyan-400">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
