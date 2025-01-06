import React from "react";

import { LoadingOverlay } from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppConfig from "./AppConfig";
import { AuthProvider, LoadingProvider, MarkerProvider } from "./contexts";
import { RouteManager } from "./routes";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={AppConfig.GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <LoadingProvider>
          <LoadingOverlay />
          <MarkerProvider>
            <RouteManager />
          </MarkerProvider>
        </LoadingProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
