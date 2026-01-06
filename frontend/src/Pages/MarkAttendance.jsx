

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function MarkAttendance() {
  const webcamRef = useRef(null);
  const [idCardNumber, setIdCardNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 📸 Capture photo + send to backend
  const handleCapture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot(); // base64 image

    if (!idCardNumber.trim() || !imageSrc) {
      setMessage("⚠️ Please enter ID and make sure your face is visible.");
      return;
    }

    // Flip the image (remove mirror effect)
    const flipped = await flipImage(imageSrc);

    try {
      setLoading(true);
      setMessage("⏳ Processing...");

      // console.log("📷 Final photo ready to send:", flipped);

      const res = await fetch("http://127.0.0.1:5000/api/v1/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCardNumber,
          livePhoto: flipped,
        }),
      });

      const data = await res.json();
      if (data.success) {
  if (data.match) {
    setMessage("✅ Attendance marked successfully!");
  } else {
    setMessage("❌ Face did not match. Attendance not marked.");
  }
} else {
  setMessage(`Error: ${data.message}`);
}
      // setMessage(data.message || "✅ Attendance marked successfully!");
    } catch (error) {
      console.error("❌ Error:", error);
      setMessage("⚠️ Error while marking attendance!");
    } finally {
      setLoading(false);
    }
  };

  // 🪞 Utility: Flip image horizontally
  const flipImage = (base64Image) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = base64Image;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.translate(img.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6 text-blue-700">
        Mark Attendance
      </h1>

      <input
        type="text"
        placeholder="Enter your ID Card Number"
        value={idCardNumber}
        onChange={(e) => setIdCardNumber(e.target.value)}
        className="border border-gray-300 rounded-md mb-4 p-2 w-72 text-center focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
          videoConstraints={{ facingMode: "user" }}
          style={{ transform: "scaleX(-1)" }} // show mirrored preview
        />
      </div>

      <button
        onClick={handleCapture}
        disabled={loading}
        className={`mt-5 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Capture & Mark Attendance"}
      </button>

      {message && (
        <p className="mt-5 text-lg font-medium text-gray-700 text-center px-4">
          {message}
        </p>
      )}
    </div>
  );
}
