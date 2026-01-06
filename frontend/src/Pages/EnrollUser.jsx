import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function EnrollUser() {
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idCardNumber: "",
    email: "",
    phoneNumber: "",
    course: "",
    role: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64 = imageSrc.replace(/^data:image\/jpeg;base64,/, "");
    setPhoto(base64);
    setIsCameraOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Please capture a photo!");
      return;
    }
    setLoading(true);
    try {
    
      console.log(photo)
      const res = await fetch("http://localhost:4000/api/v1/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, photo }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
           User Enrollment
        </h2>

        {message && (
          <div className="text-center mb-3 text-blue-700 font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <input
            type="text"
            name="idCardNumber"
            placeholder="ID Card Number"
            value={formData.idCardNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="course"
            placeholder="Course / Department"
            value={formData.course}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          {/* Camera Section */}
          <div className="flex flex-col items-center">
            {!photo && !isCameraOpen && (
              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Open Camera
              </button>
            )}

            {isCameraOpen && (
              <div className="flex flex-col items-center mt-2">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={250}
                  height={200}
                  mirrored={true}
                />
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="mt-2 bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition"
                >
                  Capture
                </button>
              </div>
            )}

            {photo && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={`data:image/jpeg;base64,${photo}`}
                  alt="Captured"
                  className="w-24 h-24 rounded-full border object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhoto(null);
                    setIsCameraOpen(true);
                  }}
                  className="text-blue-600 text-sm mt-2 underline"
                >
                  Retake Photo
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            {loading ? "Registering..." : "Register User"}
          </button>
        </form>
      </div>
    </div>
  );
}
