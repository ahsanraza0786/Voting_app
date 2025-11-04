"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
    const loadingToast = toast.loading("Signing in with Google...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Google login failed");

      localStorage.setItem("token", data.token);

      toast.dismiss(loadingToast);
      toast.success("Login successful!");

      // Redirect based on role
      if (data.role === "admin") {
        router.push("/election-management");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Google login error:", err);
      toast.dismiss(loadingToast);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <>
      <div id="googleSignInDiv"></div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
