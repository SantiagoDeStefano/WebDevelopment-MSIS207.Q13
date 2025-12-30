import React from "react";
import { ErrorBoundary as REB } from "react-error-boundary";

function Fallback() {
  return <div role="alert">Something went wrong</div>;
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <REB FallbackComponent={Fallback}>{children}</REB>;
}
