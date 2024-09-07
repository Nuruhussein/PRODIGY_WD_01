// app/components/ProtectedRoute.js
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, role }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated")
    if (role && session.user.role !== role) {
      return <div>Access Denied</div>;
    }
  return <>{children}</>;

  return null;
}
