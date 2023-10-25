import { Link, Route } from "@tanstack/react-router";
import { rootRoute } from "#router";
import { Button, Input } from "ui";
import React, { useState } from "react";
import { createCode } from "supertokens-web-js/recipe/passwordless";

async function sendMagicLink(email: string) {
  try {
    const response = await createCode({
      email,
    });
    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      console.error("Sign in/up is not allowed");
    } else {
      console.info("Please check your email for the magic link");
    }
  } catch (err: unknown) {
    console.error("Oops! Something went wrong.", err);
  }
}
const Login = () => {
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void sendMagicLink(email);
  };
  return (
    <div>
      <div className="text-center text-xl flex flex-col gap-3">
        <h1>Welcome to login page</h1>
        <Link to="/">
          <Button>Main</Button>
        </Link>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-[300px] h-[200px] p-2  rounded flex flex-col justify-center items-center gap-2 mx-auto"
      >
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={!email} className="w-full">
          Send magic link
        </Button>
      </form>
    </div>
  );
};

export const LoginIndex = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
