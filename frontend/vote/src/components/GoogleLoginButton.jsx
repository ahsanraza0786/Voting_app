// "use client";

// import { useRouter } from "next/navigation";

// export default function GoogleLoginButton() {
//   const router = useRouter();
//   const base = process.env.NEXT_PUBLIC_API_BASE;

//   const handleSuccess = async (credentialResponse) => {
//     const token = credentialResponse.credential;

//     try {
//       const res = await fetch(`${base}/auth/google`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Google login failed");

//       // Save JWT token
//       localStorage.setItem("token", data.token);

//       // Optional: Save user role if your backend returns it
//       const role = data.user?.role;
//       if (role) localStorage.setItem("role", role);

//       // Navigate based on role
//       if (role === "admin") {
//         router.push("/election-management");
//       } else {
//         router.push("/voting-booth");
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       alert("Google login failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={() => console.log("Google login failed")}
//       />
//     </div>
//   );
// }


// "use client";

// import { useRouter } from "next/navigation";
// import { GoogleLogin } from "@react-oauth/google";
// import { useCallback } from "react";

// export default function GoogleLoginButton() {
//   const router = useRouter();
//   const base = process.env.NEXT_PUBLIC_API_BASE;

//   const handleSuccess = useCallback(async (credentialResponse) => {
//     const token = credentialResponse.credential;

//     try {
//       const res = await fetch(`${base}/auth/google`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Google login failed");

//       // Save JWT token and user data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // Optional: Save user role if your backend returns it
//       const role = data.user?.role;
//       if (role) localStorage.setItem("role", role);

//       // Navigate based on role
//       if (role === "admin") {
//         router.push("/election-management");
//       } else {
//         router.push("/voting-booth");
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       alert(err.message || "Google login failed. Try again.");
//     }
//   }, [base, router]);

//   const handleError = useCallback(() => {
//     console.log("Google login failed");
//     alert("Google login failed. Please try again.");
//   }, []);

//   return (
//     <div className="flex justify-center">
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={handleError}
//         useOneTap
//         theme="filled_blue"
//         size="large"
//         text="continue_with"
//         shape="rectangular"
//         width="300"
//       />
//     </div>
//   );
// }"use client";
// GoogleLoginButton.jsx



"use client";

import { useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Decode JWT to get user info
      const user = jwtDecode(tokenResponse.credential);
      console.log("Google User Info:", user);

      // You can send this token to your backend for authentication
      // Example: fetch("/api/google-login", { method: "POST", body: JSON.stringify({ token: tokenResponse.credential }) });
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Sign in with Google
    </button>
  );
}

