import axios from "axios";
import { useState } from "react";

const EditJobForm = ({ job, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: job.title || "",
    description: job.description || "",
    company: job.company || "",
    location: job.location || "",
    minSalary: job.salary?.min || "",
    maxSalary: job.salary?.max || "",
    type: job.type || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      salary: {
        min: formData.minSalary,
        max: formData.maxSalary,
      },
    };

    try {
      await axios.put(
        `https://mehdi-technology-backend.vercel.app/jobs/${job._id}`,
        updatedData
      );
      onUpdate(); // Refresh job list
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="text-lg font-medium text-cyan-400 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter job title"
          className="p-2 border rounded"
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="text-lg font-medium text-cyan-400 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
          className="p-2 border rounded"
        />
      </div>

      {/* Company Input */}
      <div className="flex flex-col">
        <label
          htmlFor="company"
          className="text-lg font-medium text-cyan-400 mb-2"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter company name"
          className="p-2 border rounded"
        />
      </div>

      {/* Location Input */}
      <div className="flex flex-col">
        <label
          htmlFor="location"
          className="text-lg font-medium text-cyan-400 mb-2"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter job location"
          className="p-2 border rounded"
        />
      </div>

      {/* Salary Input */}
      <div className="flex flex-col">
        <label className="text-lg font-medium text-cyan-400 mb-2">
          Salary Range
        </label>
        <div className="flex space-x-4">
          <input
            type="number"
            id="minSalary"
            name="minSalary"
            value={formData.minSalary}
            onChange={handleChange}
            placeholder="Min Salary"
            className="p-2 border rounded w-full"
          />
          <input
            type="number"
            id="maxSalary"
            name="maxSalary"
            value={formData.maxSalary}
            onChange={handleChange}
            placeholder="Max Salary"
            className="p-2 border rounded w-full"
          />
        </div>
      </div>

      {/* Type Input */}
      <div className="flex flex-col">
        <label
          htmlFor="type"
          className="text-lg font-medium text-cyan-400 mb-2"
        >
          Type
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Enter job type (e.g., Full-time, Part-time)"
          className="p-2 border rounded"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 border border-cyan-300 text-gray-500 hover:bg-[#1a1b1b] rounded"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditJobForm;
