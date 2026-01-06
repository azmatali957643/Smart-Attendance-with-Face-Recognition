
import { Link } from "react-router-dom";

function Main() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        Smart Attendance System
        </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* New Registration */}
        <button className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:bg-violet-100 transition">
          <h2 className="text-xl font-semibold mb-2"><Link to="/enrolluser"> ➕ New Registration</Link></h2>
          <p className="text-gray-600 text-sm">Register a new student or faculty member into the system.
            
          </p>
        </button>

        {/* Mark Attendance */}
        <button className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:bg-green-100 transition">
          <h2 className="text-xl font-semibold mb-2"> <Link to="/markattendance">✔️ Mark Attendance </Link></h2>
            
          <p className="text-gray-600 text-sm">
            Use face recognition to mark attendance automatically.
          </p>
        </button>
      </div>
    </main>
  );
}

export default Main;
