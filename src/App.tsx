import React from "react";

import { LoadingOverlay } from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppConfig from "./AppConfig";
import {
  AuthProvider,
  LoadingProvider,
  MarkerProvider,
  ToastProvider,
} from "./contexts";
import { RouteManager } from "./routes";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={AppConfig.GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ToastProvider>
          <LoadingProvider>
            <LoadingOverlay />
            <MarkerProvider>
              <RouteManager />
            </MarkerProvider>
          </LoadingProvider>
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
