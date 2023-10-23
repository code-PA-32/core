import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "#router";
import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class">
    <RouterProvider router={router} />
  </ThemeProvider>,
);
