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
    connectionURI: process.env.SUPERTOKENS_URL as string,
    apiKey: process.env.SUPERTOKENS_API_KEY as string,
  },
  appInfo: {
    appName: "core-be-app",
    apiDomain: process.env.SUPERTOKENS_API_DOMAIN as string,
    websiteDomain: process.env.WEBSITE_DOMAIN as string,
    apiBasePath: "/auth",
    websiteBasePath: "/login",
  },
  recipeList: [
    Passwordless.init({
      flowType: "MAGIC_LINK",
      contactMethod: "EMAIL",
    }),
    Session.init(),
  ],
});

app.use(
  cors({
    origin: process.env.WEBSITE_DOMAIN as string,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }),
);

app.use(middleware());

app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  res.send(JSON.stringify(`Hello world! ${req.path}`));
});

app.use(errorHandler());

app.listen(port, "localhost", 511, () => {
  console.info(`Server is listening on port ${port}`);
});
