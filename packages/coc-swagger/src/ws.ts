import { Server } from "http";
import * as WebSocket from "ws";
import { getCurrentBufferContent } from "./util";

// TODO keep alive

let wss: WebSocket.Server;

export function setup(server: Server) {
  wss = new WebSocket.Server({ server });
  wss.on("connection", (client: WebSocket) => {
    client.on("message", async (message: string) => {
      const x = JSON.parse(message);
      // client will send this message when it's being loaded
      if (x.type === "Hello") {
        const s = await getCurrentBufferContent();
        client.send(s);
      }
    });
  });
}

export function broadcast(msg: string) {
  let count = 0;
  wss.clients.forEach((ws) => {
    ws.send(msg);
    count++;
  });
  return count;
}
