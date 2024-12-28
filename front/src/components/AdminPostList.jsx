import axios from "axios";
import { useEffect, useState } from "react";
import EditJobForm from "./EditJobForm"; // Import the EditJobForm component

const AdminPostList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null); // Track job to edit

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://mehdi-technology-backend.vercel.app/jobs"
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(
        `https://mehdi-technology-backend.vercel.app/jobs/${id}`
      );
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const refreshJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://mehdi-technology-backend.vercel.app/jobs"
      );
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
      setSelectedJob(null); // Close edit form
    }
  };

  if (loading) {
    return <p className="text-center">Loading jobs...</p>;
  }

  return (
    <div className="bg-[#101214] p-2 w-full h-auto">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-cyan-300 font-mono text-center text-2xl mb-8 mt-10">
          Job Lists
        </h1>
        <div className="grid grid-cols-2 gap-5 text-white">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow space-y-4"
              >
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Title
                  </span>
                  <h2 className="text-[15px] font-semibold">{job.title}</h2>
                </div>
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Company
                  </span>
                  <p className="text-[15px]">{job.company}</p>
                </div>
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Location
                  </span>
                  <p className="text-[15px]">{job.location}</p>
                </div>
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Salary
                  </span>
                  <p>
                    {job.salary?.min} - {job.salary?.max}
                  </p>{" "}
                </div>
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Type
                  </span>
                  <p className="text-[15px]">{job.type}</p>
                </div>
                <div>
                  <span className="font-medium text-cyan-300 text-xl">
                    Description
                  </span>
                  <p className="text-[15px]">{job.description}</p>
                </div>
                <div className="space-x-3 flex">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-20 py-2 border border-cyan-300 text-white hover:bg-[#1a1b1b] rounded-md transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="mt-4 w-20 py-2 border border-cyan-300 text-white hover:bg-[#461717] rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No jobs available.</p>
          )}
        </div>

        {selectedJob && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center overflow-y-scroll">
            <div className="bg-black p-6 rounded shadow-lg max-w-2xl h-[900px] w-full">
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">
                Edit Job
              </h2>
              <EditJobForm
                job={selectedJob}
                onUpdate={refreshJobs} // Refresh job list after edit
              />
              <button
                onClick={() => setSelectedJob(null)}
                className="mt-4 w-full py-2 border border-cyan-300 text-gray-700 hover:bg-[#1a1b1b] rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPostList;
