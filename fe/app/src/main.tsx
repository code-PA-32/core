import ReactDOM from "react-dom/client";
import "./index.css";
import "./services/supertokens.js";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "#router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "ui";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class">
    <Toaster />
    <RouterProvider router={router} />
  </ThemeProvider>,
);
