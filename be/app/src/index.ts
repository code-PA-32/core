import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import Passwordless from "supertokens-node/recipe/passwordless";
import { middleware, errorHandler } from "supertokens-node/framework/express";

const app = express();

const port: number = process.env.PORT as any as number;

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "http://localhost:3567",
    apiKey: "core-secret-key-supertokens",
  },
  appInfo: {
    appName: "core-be-app",
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:3001",
    apiBasePath: "/auth",
    websiteBasePath: "/login",
  },
  recipeList: [
    Passwordless.init({
      flowType: "MAGIC_LINK",
      contactMethod: "EMAIL",
    }),
    Session.init(), // initializes session features
  ],
});

app.use(
  cors({
    origin: "http://localhost:3001",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }),
);

app.use(middleware());

app.get("/", (req, res) => {
  const text = JSON.stringify("Hello world!");
  res.send(text);
});

app.use(errorHandler());

app.listen(port, "localhost", 511, () => {
  console.info(`Server is listening on port ${port}`);
});
