// app/layout.js
"use client";
// _app.js
import "./globals.css"; // Ensure this path is correct

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
