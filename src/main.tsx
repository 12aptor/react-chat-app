import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChannelChat } from "./components/channel-chat";
import { LoginForm } from "./components/login-form";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "",
    element: <LoginForm />,
  },
  {
    path: "chat",
    element: <ChannelChat />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
