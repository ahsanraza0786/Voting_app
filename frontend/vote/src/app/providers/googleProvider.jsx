import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
  <GoogleLogin
    onSuccess={credentialResponse => handleGoogleSuccess(credentialResponse)}
    onError={() => handleGoogleError()}
    useOneTap={false} // Disable One Tap to prevent COOP issues
  />
</GoogleOAuthProvider>
