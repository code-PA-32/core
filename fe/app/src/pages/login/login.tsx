import { Link, Route } from "@tanstack/react-router";
import { rootRoute } from "#router";

const Login = () => {
  return (
    <div>
      <h1>Welcome to login page</h1>
      <Link to="/">Main</Link>
    </div>
  );
};

export const LoginIndex = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
