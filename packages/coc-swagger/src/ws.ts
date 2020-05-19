import { Server } from "http";
import * as WebSocket from "ws";

// TODO keep alive

let wss: WebSocket.Server;

export function setup(server: Server) {
  wss = new WebSocket.Server({ server });
  // wss.on("connection", (ws: WebSocket) => {
  //   ws.send("ack");
  // });
}

export function send(msg: string) {

  let count = 0;
  wss.clients.forEach((ws) => {
    ws.send(msg);
    count++;
  });
  return count;
}
