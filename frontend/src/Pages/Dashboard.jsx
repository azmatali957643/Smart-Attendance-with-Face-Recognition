// import React, { useState, useEffect } from "react";

// function Dashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ✅ Fetch all users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:4000/api/v1/users");
//       const data = await res.json();
//       setUsers(data.users || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setLoading(false);
//     }
//   };

//   // ✅ Delete user by idCardNumber
//   const handleDelete = async (idCardNumber) => {
//     if (!window.confirm(`Delete user with ID ${idCardNumber}?`)) return;

//     try {
//       const res = await fetch("http://localhost:4000/api/v1/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ idCardNumber }),
//       });

//       const data = await res.json();
//       setMessage(data.message || data.error);

//       // ✅ Update state immediately (no need to refetch)
//       setUsers((prevUsers) =>
//         prevUsers.filter((user) => user.idCardNumber !== idCardNumber)
//       );
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

//       {message && (
//         <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
//           {message}
//         </div>
//       )}

//       {loading ? (
//         <p>Loading users...</p>
//       ) : (
//         <table className="min-w-full bg-white border rounded-xl shadow-md">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Surname</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">ID Card Number</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user._id} className="border-b">
//                   <td className="px-4 py-2">{user.firstName}</td>
//                   <td className="px-4 py-2">{user.lastName}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2">{user.idCardNumber}</td>
//                   <td className="px-4 py-2 text-center">
//                     <button
//                       onClick={() => handleDelete(user.idCardNumber)} 
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Dashboard;





// import React, { useState, useEffect } from "react";

// function Dashboard() {
//   const [activeTab, setActiveTab] = useState("present");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [presentList, setPresentList] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ✅ Fetch Present Users
//   const fetchPresent = async (date = "") => {
//     try {
//       setLoading(true);
//       let url = "http://localhost:5000/api/present";
//       if (date) url += `?date=${date}`;
//       const res = await fetch(url);
//       const data = await res.json();

//       if (res.ok) {
//         setPresentList(data.students || []);
//         setMessage("");
//       } else {
//         setMessage(data.message || "Failed to fetch present members");
//       }
//     } catch (error) {
//       console.error("Error fetching present members:", error);
//       setMessage("Error fetching present members");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch All Registered Users
//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/v1/users");
//       const data = await res.json();
//       if (res.ok) setUsers(data.users || []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   // ✅ Delete User by ID Card Number
//   const handleDelete = async (idCardNumber) => {
//     if (!window.confirm(`Delete user with ID ${idCardNumber}?`)) return;

//     try {
//       const res = await fetch("http://localhost:4000/api/v1/delete", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ idCardNumber }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage(data.message || "User deleted successfully");
//         setUsers((prev) =>
//           prev.filter((u) => u.idCardNumber !== idCardNumber)
//         );
//       } else {
//         setMessage(data.error || "Failed to delete user");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   // 🔹 Load both sections on mount
//   useEffect(() => {
//     fetchUsers();
//     fetchPresent();
//   }, []);

//   // 🔹 Fetch when date changes
//   useEffect(() => {
//     fetchPresent(selectedDate);
//   }, [selectedDate]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         🧑‍💼 Admin Dashboard
//       </h1>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6 bg-white p-2 rounded-xl shadow-md">
//         <button
//           onClick={() => setActiveTab("present")}
//           className={`px-6 py-2 rounded-lg font-semibold transition-all ${
//             activeTab === "present"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Present Members
//         </button>
//         <button
//           onClick={() => setActiveTab("users")}
//           className={`px-6 py-2 rounded-lg font-semibold transition-all ${
//             activeTab === "users"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Registered Users
//         </button>
//       </div>

//       {/* Content Area */}
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6">
//         {message && (
//           <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
//             {message}
//           </div>
//         )}

//         {activeTab === "present" ? (
//           <div>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-700">
//                 ✅ Present Members
//               </h2>
//               <input
//                 type="date"
//                 className="border border-gray-300 rounded-lg px-3 py-2"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//               />
//             </div>

//             {loading ? (
//               <p className="text-gray-500 text-center">Loading...</p>
//             ) : presentList.length > 0 ? (
//               <table className="min-w-full bg-white border rounded-lg shadow-sm">
//                 <thead className="bg-gray-200">
//                   <tr>
//                     <th className="px-4 py-2 text-left">Name</th>
//                     <th className="px-4 py-2 text-left">ID Card</th>
//                     <th className="px-4 py-2 text-left">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {presentList.map((student) => (
//                     <tr
//                       key={student._id || student.idCardNumber}
//                       className="border-b hover:bg-gray-50"
//                     >
//                       <td className="px-4 py-2">{student.name}</td>
//                       <td className="px-4 py-2">{student.idCardNumber}</td>
//                       <td className="px-4 py-2">
//                         {student.date || selectedDate || "Today"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p className="text-gray-500 text-center">
//                 No members marked present for this date.
//               </p>
//             )}
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">
//               👥 Registered Users
//             </h2>

//             {users.length > 0 ? (
//               <table className="min-w-full bg-white border rounded-lg shadow-sm">
//                 <thead className="bg-gray-200">
//                   <tr>
//                     <th className="px-4 py-2 text-left">First Name</th>
//                     <th className="px-4 py-2 text-left">Last Name</th>
//                     <th className="px-4 py-2 text-left">Email</th>
//                     <th className="px-4 py-2 text-left">ID Card</th>
//                     <th className="px-4 py-2 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id} className="border-b hover:bg-gray-50">
//                       <td className="px-4 py-2">{user.firstName}</td>
//                       <td className="px-4 py-2">{user.lastName}</td>
//                       <td className="px-4 py-2">{user.email}</td>
//                       <td className="px-4 py-2">{user.idCardNumber}</td>
//                       <td className="px-4 py-2 text-center">
//                         <button
//                           onClick={() => handleDelete(user.idCardNumber)}
//                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p className="text-gray-500 text-center py-4">
//                 No users registered yet.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from 'react';
import UserDetails from '../Component/UserDetails';
import PresentStudents from '../Component/PresentStudents';

function Dashboard() {
  const [activeTab, setActiveTab] = useState("present"); 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Admin Dashboard
      </h1>

      {/* Tab Buttons */}
      <div className="flex justify-center space-x-6 mb-8 bg-white p-3 rounded-2xl shadow-lg">
        <button
          onClick={() => setActiveTab("present")}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
            activeTab === "present"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Present Students
        </button>

        <button
          onClick={() => setActiveTab("registered")}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
            activeTab === "registered"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Registered Users
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg">
        {activeTab === "registered" ? <UserDetails /> : <PresentStudents />}
      </div>
    </div>
  );
}

export default Dashboard;


