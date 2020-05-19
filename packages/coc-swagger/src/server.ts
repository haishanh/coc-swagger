import express from "express";
import * as http from "http";
import * as path from "path";
import * as ws from "./ws";

export function start(port: number) {
  const app = express();
  const server = http.createServer(app);

  ws.setup(server);

  const dir = path.resolve(__dirname, "..", "public");
  // const dir =  path.resolve(__dirname, "..", "..", "client", "public");

  app.use(express.static(dir));

  server.listen(port);
}
