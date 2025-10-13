"use client";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({ onSuccess, onError }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      useOneTap={false} // important to fix COOP error
    />
  );
}
