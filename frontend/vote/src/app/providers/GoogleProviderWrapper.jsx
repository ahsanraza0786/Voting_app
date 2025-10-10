"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProviderWrapper({ children }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("❌ Google Client ID missing. Add it to .env.local");
    return children;
  }

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}
