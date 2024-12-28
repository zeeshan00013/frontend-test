import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-80">
      <div className="bg-black  h-full">
        <h1 className="text-cyan-300 font-mono text-center text-2xl py-16">
          ADMIN DASHBOARD
        </h1>
        <div className=" items-center flex flex-col">
          <ul className=" space-y-10 flex flex-col items-center text-white text-xl w-full">
            <Link
              to={"/admin"}
              className="border-b w-40 text-center border-b-cyan-300"
            >
              Job post
            </Link>
            <Link
              to={"/admin/adminpost"}
              className="border-b w-40 text-center border-b-cyan-300    "
            >
              Admin Job List
            </Link>
            <Link
              to={"/admin/application"}
              className="border-b w-40 text-center border-b-cyan-300    "
            >
              Application list
            </Link>
            <Link
              to={"/admin/user"}
              className="border-b w-40 text-center border-b-cyan-300    "
            >
              New Jobs
            </Link>
          </ul>
          <button className="mt-10 w-32 py-2  border border-cyan-300 text-white hover:bg-[#1a1b1b] rounded-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
