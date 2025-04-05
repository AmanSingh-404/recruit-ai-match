
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const { user, loading } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  // Toggle between sign in and sign up forms
  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">RecruitMatch</h1>
          <p className="text-muted-foreground">
            AI-powered recruitment matching platform
          </p>
        </div>
        {showSignIn ? (
          <SignInForm onToggleForm={toggleForm} />
        ) : (
          <SignUpForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Auth;
