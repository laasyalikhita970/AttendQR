import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.clear();

    navigate("/");

  };

  // Hide navbar if not logged in
  if (!token) {
    return null;
  }

  return (
    <nav className="bg-black text-white p-4 shadow-lg">

      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          AttendQR 🚀
        </h1>

        <div className="flex gap-6 items-center">

          {/* Teacher Links */}
          {role === "teacher" && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-300"
              >
                Dashboard
              </Link>

              <Link
                to="/history"
                className="hover:text-gray-300"
              >
                History
              </Link>
            </>
          )}

          {/* Student Links */}
          {role === "student" && (
            <Link
              to="/scan"
              className="hover:text-gray-300"
            >
              Scan QR
            </Link>
          )}

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;