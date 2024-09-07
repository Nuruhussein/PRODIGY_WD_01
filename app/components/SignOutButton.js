// components/SignOutButton.js
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(); // `redirect: false` prevents automatic redirection
    router.push("/"); // Redirect to home page or any other page after sign-out
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
    >
      Sign Out
    </button>
  );
}
