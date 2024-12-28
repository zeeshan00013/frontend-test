import { useState } from "react";
import axios from "axios";

const JobPostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Send data to backend API
    try {
      const response = await axios.post(
        "https://mehdi-technology-backend.vercel.app/jobs",
        {
          title,
          description,
          company,
          location,
          salary,
          type,
        }
      );
      setLoading(false);
      setMessage("Job posted successfully!");
      // Reset form fields
      setTitle("");
      setDescription("");
      setCompany("");
      setLocation("");
      setSalary("");
      setType("");
      console.log(response);
    } catch (error) {
      setLoading(false);
      setMessage("Error posting job.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#101214] flex items-center justify-center p-2 w-full min-h-min">
      <div className="border text-white rounded-lg shadow-lg p-4 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-300">
          POST A JOB
        </h1>
        <form onSubmit={handleSubmit} className="space-y-2 flex flex-col">
          <div className="">
            <div className="space-y-2">
              <label htmlFor="title" className="text-xl font-medium">
                Job Title
              </label>
              <select
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
                required
              >
                <option value="" disabled>
                  Select job title
                </option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-xl font-medium">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
                placeholder="Enter company name"
                required
              />
            </div>
          </div>
          <div className="">
            <div className="space-y-2">
              <label htmlFor="location" className="text-xl font-medium">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
                placeholder="Enter job location"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="salary" className="text-xl font-medium">
                Salary
              </label>
              <select
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
                required
              >
                <option value="" disabled>
                  Select salary range
                </option>
                <option value="0-10000">0-10000</option>
                <option value="10000-20000">10000-20000</option>
                <option value="20000-40000">20000-40000</option>
              </select>
            </div>
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="type" className="text-xl font-medium">
              Type
            </label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
              placeholder="Enter type"
              required
            />
          </div>

          <div className="space-y-2  flex flex-col justify-center">
            <label htmlFor="description" className="text-xl font-medium">
              Job Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 text-black border rounded focus:outline-none focus:ring-1 focus:ring-cyan-300"
              rows="5"
              placeholder="Enter job description"
              required
            />
          </div>

          <div className="flex w-full">
            <button
              type="submit"
              className="py-2 w-full border border-cyan-300 rounded text-lg font-medium transition-all ease-in-out duration-300 hover:bg-[#1a1b1b]"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
        {message && (
          <div
            className={`mt-2 p-2 text-white text-center rounded ${
              message.includes("Error") ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostForm;
