import React from "react";
import { Button } from "@core/ui";
import { Outlet, Link, Router, RootRoute } from "@tanstack/react-router";
import { SettingIndex } from "#pages/settings/index.js";
import { LoginIndex, VerifyIndex } from "#pages/login/index.js";
import { ModeToggle } from "#theme/index.js";
import { Logout } from "#utils/auth.js";

const RootRedirect = () => {
  return (
    <>
      <div className="flex justify-between p-2">
        <div className="flex gap-2">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/setting">
            <Button>Setting</Button>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <ModeToggle className="h-6 w-6" />
          <Button onClick={Logout}>Logout</Button>
        </div>
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

const routeTree = rootRoute.addChildren([
  SettingIndex,
  LoginIndex,
  VerifyIndex,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
