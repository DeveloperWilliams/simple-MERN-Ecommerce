import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

function GoogleAuth() {
  const handleSuccess = async (response) => {
    // Check if response.credential is defined and use it correctly.
    const token = response?.credential;

    if (!token) {
      console.error("Token not found in response");
      return;
    }

    try {
      const apiResponse = await axios.post(
        "http://localhost:8080/api/auth/google",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (apiResponse.status === 200) {
        console.log("User logged in successfully");
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleError = (error) => {
    console.error("Error in Google Login:", error);
  };

  return (
    <GoogleOAuthProvider
      clientId={`  779120061654 -
        e01sd534ekeua1svcl9pc0j7rt51060q.apps.googleusercontent.com`}
    >
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
