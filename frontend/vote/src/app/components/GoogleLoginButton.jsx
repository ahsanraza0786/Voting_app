"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();
  const base = process.env.NEXT_PUBLIC_API_BASE;

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await fetch(`${base}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google login failed");

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Optional: Save user role if your backend returns it
      const role = data.user?.role;
      if (role) localStorage.setItem("role", role);

      // Navigate based on role
      if (role === "admin") {
        router.push("/election-management");
      } else {
        router.push("/voting-booth");
      }
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Google login failed")}
      />
    </div>
  );
}
