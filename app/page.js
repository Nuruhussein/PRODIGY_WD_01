"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleRedirect = (url) => {
    if (!session) {
      // If not authenticated, redirect to sign-in page
      router.push("/auth/signin");
    } else {
      // If authenticated, redirect to the desired page
      router.push(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center mb-52 px-4 py-8 relative">
      <h1 className="text-4xl font-extrabold text-black mb-6">
        Welcome to Our Authentication System
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-lg">
        This project is an implementation of a secure user authentication system
        with role-based access control. It provides functionalities for user
        registration and login, with protected routes that restrict access based
        on user roles. Admin users can access specialized administrative
        features, while regular users are directed to standard user interfaces.
        The system uses secure password hashing and session management to ensure
        robust security and personalized access.
      </p>

      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="bg-black shadow-lg text-white px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black  transition duration-300"
      >
        Get Started
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-black shadow-lg p-6 w-64 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-100 hover:text-gray-100"
        >
          &times;
        </button>
        <ul className="space-y-4 mt-10">
          <li>
            <Link
              href="/auth/signin"
              className="block text-center text-gray-100 hover:text-black hover:bg-blue-50 py-2 px-4 rounded-lg transition duration-300"
              onClick={() => setSidebarOpen(false)}
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="block text-center text-gray-100 hover:bg-blue-50 hover:text-black py-2 px-4 rounded-lg transition duration-300"
              onClick={() => setSidebarOpen(false)}
            >
              Register
            </Link>
          </li>
          <li>
            <button
              onClick={() => handleRedirect("/protected")}
              className="block w-full text-center text-gray-100 hover:text-black hover:bg-blue-50 py-2 px-4 rounded-lg transition duration-300"
            >
              User Page
            </button>
          </li>
          <li>
            <button
              onClick={() => handleRedirect("/admin")}
              className="block w-full text-center text-gray-100 hover:text-black hover:bg-blue-50 py-2 px-4 rounded-lg transition duration-300"
            >
              Admin Page
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
