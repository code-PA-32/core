import React from "react";
import { Outlet, Link, Router, RootRoute } from "@tanstack/react-router";
import { SettingIndex } from "#pages/settings/index.js";
import { LoginIndex } from "#pages/login/index.js";
import { ModeToggle } from "#theme/index.js";

const RootRedirect = () => {
  return (
    <>
      <div className="flex gap-2">
        <Link to="/login">Login</Link>
        <Link to="/setting">Settings</Link>
        <ModeToggle className="h-6 w-6" />
      </div>
      <hr />
      <br />
      <Outlet />
    </>
  );
};

export const rootRoute = new RootRoute({
  component: RootRedirect,
});

const routeTree = rootRoute.addChildren([SettingIndex, LoginIndex]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
