import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { goodreads } from "./goodreads";

const http = httpRouter();

auth.addHttpRoutes(http);
http.route({
  method: "GET",
  path: "/goodreads",
  handler: goodreads,
});

export default http;
