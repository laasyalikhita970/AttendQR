import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
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
      const res = await API.post("/auth/register", formData);

      console.log(res.data);

      alert("Registration successful ✅");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Registration failed ❌");
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
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
        />

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

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
        >
          <option value="student">
            Student
          </option>

          <option value="teacher">
            Teacher
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold"
        >
          Register
        </button>

      </form>

      <p className="text-gray-300 mt-6 text-center">
        Already have an account?{" "}

        <Link
          to="/"
          className="text-blue-400"
        >
          Login
        </Link>
      </p>

    </div>

  </div>
);
}

export default Register;