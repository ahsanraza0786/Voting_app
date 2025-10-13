"use client"; // if using Next.js 13+ app directory

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    console.log("Google Credential:", response);

    try {
      // Send credential to your backend
      const res = await fetch("https://your-backend-domain.com/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard"); // redirect after login
      } else {
        console.error("Login failed:", data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <div id="googleSignInDiv"></div>;
}
