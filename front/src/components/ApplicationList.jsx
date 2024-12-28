import { useEffect, useState } from "react";
import axios from "axios";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "https://mehdi-technology-backend.vercel.app/applications"
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://mehdi-technology-backend.vercel.app/applications/${id}`
      );
      setApplications(applications.filter((app) => app._id !== id));
      alert("Application deleted successfully!");
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application.");
    }
  };

  if (loading) {
    return <p className="text-center text-white">Loading applications...</p>;
  }

  return (
    <div className="bg-[#101214] p-2 w-full h-auto">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-cyan-300 font-mono text-center text-2xl mb-8 mt-10">
          Applications List
        </h1>
        {applications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-white">
            {applications.map((app) => (
              <div
                key={app._id} // Use _id as key
                className="relative border border-gray-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow space-y-4 "
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(app._id)}
                  className="absolute top-2 right-2 text-white text-2xl hover:text-red-500"
                >
                  ×
                </button>

                {/* Job Title */}
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Job Title
                  </span>
                  <p className="text-[15px] font-semibold">
                    {app.jobId?.title || "No title available"}
                  </p>
                </div>

                {/* First Name */}
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    First Name
                  </span>
                  <p className="text-[15px] font-semibold">{app.first_name}</p>
                </div>

                {/* Last Name */}
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Last Name
                  </span>
                  <p className="text-[15px]">{app.last_name}</p>
                </div>

                {/* Contact */}
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Contact
                  </span>
                  <p className="text-[15px]">{app.contact}</p>
                </div>

                {/* Resume Link */}
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Resume
                  </span>
                  <p className="text-[15px]">
                    {app.resume ? (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 underline hover:text-cyan-300"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-500">
                        Resume not available
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-cyan-300 mt-10">
            No applications available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
