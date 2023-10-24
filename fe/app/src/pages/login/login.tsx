import { Link, Route } from "@tanstack/react-router";
import { rootRoute } from "#router";
import React, { useState } from "react";
import { createCode } from "supertokens-web-js/recipe/passwordless";

async function sendMagicLink(email: string) {
  try {
    const response = await createCode({
      email,
    });
    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      // this can happen due to automatic account linking. See that section in our docs.
    } else {
      // Magic link sent successfully.
      console.error("Please check your email for the magic link");
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
      <h1>Welcome to login page</h1>
      <Link to="/">Main</Link>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send magic link</button>
      </form>
    </div>
  );
};

export const LoginIndex = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
