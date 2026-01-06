import React, { useEffect, useState } from "react";

function PresentStudents() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(""); // for date filter
  const [loading, setLoading] = useState(false);

  // Fetch data (optionally with date)
  const fetchAttendance = async (selectedDate = "") => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/v1/present-user";
      if (selectedDate) {
        url += `?date=${selectedDate}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setStudents(data.data);
      } else {
        console.error("Error:", data.message);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance(); // load all initially
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Present Students</h2>

      {/* Date filter */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />
        <button
          onClick={() => fetchAttendance(date)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={() => {
            setDate("");
            fetchAttendance();
          }}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-black text-left">
              <th className="py-3 px-4">ID Card</th>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{student.idCardNumber}</td>
                <td className="py-2 px-4">{student.firstName}</td>
                <td className="py-2 px-4">{student.lastName}</td>
                <td className="py-2 px-4">{student.role}</td>
                <td className="py-2 px-4">
                
                  {new Date(student.timestamp).toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
})}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PresentStudents;
