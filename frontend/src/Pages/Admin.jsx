import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin({isLoggedIn ,setIsLoggedIn}) {
  // console.log("admin me ",isLoggedIn)
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log credentials. Replace with API call later.
    // console.log("Admin Login Attempt:", credentials);
    alert("✅ Login submitted!");
    // console.log("login good")
    setCredentials({ email: "", password: "" });
       if (credentials.email === "admin@gmail.com" && credentials.password === "1234") {
    setIsLoggedIn(true); // direct true
    navigate('/dashboard');
    // console.log("Login successful!",isLoggedIn);
  } else {
    alert("❌ Invalid credentials!");
    return;
  }

    // setIsLoggedIn(!isLoggedIn);
    // console.log("after admin login",isLoggedIn)
    // console.log(isLoggedIn)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>

          {/* Forgot Password */}
          <p className="text-sm text-center text-gray-600 mt-2">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Admin;




