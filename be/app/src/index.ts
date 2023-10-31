import Fastify from "fastify";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import Passwordless from "supertokens-node/recipe/passwordless";
import formDataPlugin from "@fastify/formbody";
import cors from "@fastify/cors";
import { plugin, errorHandler } from "supertokens-node/framework/fastify";

const fastify = Fastify({
  logger: true,
});

const port: number = process.env.PORT as any as number;

supertokens.init({
  framework: "fastify",
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

void fastify.register(cors, {
  origin: "http://localhost:3001",
  allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
});
void fastify.register(formDataPlugin);
void fastify.register(plugin);
fastify.setErrorHandler(errorHandler());
fastify.get("/", function get(request, reply) {
  void reply.send({ hello: "world" });
});

fastify.addHook("preHandler", (request, reply, done) => {
  fastify.log.info(
    {
      req: request,
    },
    "request started",
  );
  done();
});

fastify.addHook("onResponse", (request, reply, done) => {
  const responseTime = reply.getResponseTime();
  fastify.log.info(
    {
      response: {
        statusCode: reply.raw.statusCode,
      },
      responseTime,
    },
    "request completed",
  );
  done();
});

void fastify
  .listen({ port })
  .then(() => fastify.log.info("Server started on port 4000"))
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
