import React from "react";
import { useAuth } from "./useAuth";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Tu dois être connecté</h2>
        <p>Va sur la page Login.</p>
      </div>
    );
  }

  return <>{children}</>;
}