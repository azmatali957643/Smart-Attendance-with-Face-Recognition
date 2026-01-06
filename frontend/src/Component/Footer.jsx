import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

function Footer() {
  return (
    <footer className=" bg-gray-900 text-gray-300 py-6 mt-10">
      <div className=" flex justify-between flex-wrap max-w-7xl mx-auto px-4 ">

        
 {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-white">Smart Attendance</h2>
          <p className="mt-2 text-sm">
            AI-powered face recognition and anti-spoofing attendance system.
          </p>
        </div>

     

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-white"><Github size={20} /></a>
          </div>
        </div>
      

        </div>
        
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Smart Attendance. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
