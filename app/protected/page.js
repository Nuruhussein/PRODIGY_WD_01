// pages/protected.js
"use client";
import { useSession } from "next-auth/react";
import ProtectedRoute from "../components/ProtectedRoute";
import SignOutButton from "../components/SignOutButton";

export default function ProtectedPage() {
  const { data: session } = useSession();
  const name = session?.user?.name;
  // console.log("the session is ", session);
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            hello {name}
          </h1>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            this is Protected user Page
          </h1>
          <p className="text-gray-600 mb-6">
            This page is protected and only accessible to authenticated users.
          </p>
          <SignOutButton /> {/* Add sign-out button here */}
        </div>
      </div>
    </ProtectedRoute>
  );
}
