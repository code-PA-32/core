import type { FastifyReply, FastifyRequest } from "fastify";
import Fastify from "fastify";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import Passwordless from "supertokens-node/recipe/passwordless";
import formDataPlugin from "@fastify/formbody";
import cors from "@fastify/cors";
import { plugin, errorHandler } from "supertokens-node/framework/fastify";
import { createYoga } from "graphql-yoga";

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
const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  // Integrate Fastify logger
  logging: {
    debug: (...args) => args.forEach((arg) => fastify.log.debug(arg)),
    info: (...args) => args.forEach((arg) => fastify.log.info(arg)),
    warn: (...args) => args.forEach((arg) => fastify.log.warn(arg)),
    error: (...args) => args.forEach((arg) => fastify.log.error(arg)),
  },
});

void fastify.register(cors, {
  origin: process.env.WEBSITE_DOMAIN as string,
  allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
});
void fastify.register(formDataPlugin);
void fastify.register(plugin);
fastify.setErrorHandler(errorHandler());
fastify.get("/", function get(request, reply) {
  void reply.send({ hello: "world" });
});
fastify.route({
  url: "/graphql",
  method: ["GET", "POST"],
  handler: async (req, reply) => {
    // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply,
    });
    response.headers.forEach((value, key) => {
      void reply.header(key, value);
    });
    void reply.status(response.status);
    void reply.send(response.body);
    return reply;
  },
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
