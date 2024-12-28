import { useState } from "react";
import axios from "axios";

const ApplyJobForm = ({ jobId, onApply, onClose }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [resume, setResume] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(false); // New state for submission status
  const [showPopup, setShowPopup] = useState(false); // State to show/hide the popup

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("contact", contact);
    formData.append("resume", resume);

    try {
      const response = await axios.post(
        `https://mehdi-technology-backend.vercel.app/jobs/${jobId}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Application submitted successfully:", response.data);
      setSubmissionStatus("Application submitted successfully!"); // Set success message
      setShowPopup(true); // Show the popup
      onApply(); // Call onApply to refresh job listings
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmissionStatus("Error submitting application. Please try again.");
      setShowPopup(true); // Show the popup with error message
    }
  };

  return (
    <div>
      {/* Application Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-cyan-300 font-medium">First Name</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-cyan-300 font-medium">Last Name</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-cyan-300 font-medium">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-cyan-300 font-medium">
            Resume (PDF)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-cyan-300 text-black font-medium rounded hover:bg-cyan-400"
        >
          Submit Application
        </button>
      </form>

      {/* Popup Message */}
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 z-50"
          onClick={() => setShowPopup(false)} // Close the popup when clicked
        >
          <div
            className="bg-white p-6 rounded shadow-lg max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner content click
          >
            <p
              className={`font-medium ${
                submissionStatus.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {submissionStatus}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 py-2 px-4 bg-cyan-300 text-black font-medium rounded hover:bg-cyan-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJobForm;
