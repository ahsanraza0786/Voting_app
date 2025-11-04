"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

export default function GoogleLoginButton() {
  const router = useRouter();

  useEffect(() => {
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
    const credential = response.credential;
    if (!credential) {
      toast.error("No Google credential received!");
      return;
    }

    try {
      const res = await fetch(`${base}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Login failed:", data);
        toast.error(data.error || "Google login failed!");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      toast.success("Login successful!");
      router.push("/election-management"); // redirect for admin
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return <div id="googleSignInDiv"></div>;
}
