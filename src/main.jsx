import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import FirebaseProvider from "./FirebaseProvider/FirebaseProvider.jsx";
import "./i18n.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
    <QueryClientProvider client={queryClient}>
      <div className=" mx-auto">
        <RouterProvider router={router} />
      </div>
      </QueryClientProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
