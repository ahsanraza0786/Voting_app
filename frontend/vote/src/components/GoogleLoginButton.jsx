// src/app/login/GoogleLoginButton.jsx
"use client";

import { useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const user = jwt_decode(tokenResponse.credential);
      console.log("Google User Info:", user);

      // Save user info in your state or backend here
      // Then redirect:
      router.push("/dashboard"); // redirect user after login
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <button onClick={() => login()} className="btn-google">
      Login with Google
    </button>
  );
}
