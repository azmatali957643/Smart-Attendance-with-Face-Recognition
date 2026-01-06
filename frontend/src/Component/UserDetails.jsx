import React, { useState, useEffect } from "react";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/v1/users");
      const data = await res.json();
      setUsers(data.users || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  // ✅ Delete user by idCardNumber
  const handleDelete = async (idCardNumber) => {
    if (!window.confirm(`Delete user with ID ${idCardNumber}?`)) return;

    try {
      const res = await fetch("http://localhost:4000/api/v1/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idCardNumber }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      // ✅ Update state immediately (no need to refetch)
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.idCardNumber !== idCardNumber)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Registered Users</h1>

      {message && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Email</th>
               <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">ID Card Number</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">{user.firstName}    { user.lastName}</td>
                  <td className="px-4 py-2">{user.phoneNumber}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.idCardNumber}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(user.idCardNumber)} 
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserDetails;