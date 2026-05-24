import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      console.log(res.data);

      alert("Login successful ✅");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
  "role",
  res.data.user.role
);

if (res.data.user.role === "teacher") {

  window.location.href = "/dashboard";

} else {

  window.location.href = "/scan";

}
    } catch (error) {
      console.log(error);
      alert("Login failed ❌");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">

    <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-[400px]">

      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        AttendQR 🚀
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold"
        >
          Login
        </button>

      </form>

      <p className="text-gray-300 mt-6 text-center">
        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-blue-400"
        >
          Register
        </Link>
      </p>

    </div>

  </div>
);
}

export default Login;