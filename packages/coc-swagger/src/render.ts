import { workspace } from "coc.nvim";
import open from "open";
import detect from "detect-port-alt";
import { getCurrentBufferContent } from "./util";

import * as server from "./server";
import * as ws from "./ws";

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let port: number;

export async function render(shouldOpen = false) {
  if (!port) {
    // workspace.showMessage("starting server");
    port = await detect(55555, "localhost");

    try {
      server.start(port);
    } catch (e) {
      workspace.showMessage(
        `failed to start local http server listen on ${port}`,
        "error"
      );
      throw e;
    }
  }

  const url = `http://localhost:${port}`;
  if (shouldOpen) open(url);
}

export async function refresh() {
  const s = await getCurrentBufferContent();
  ws.broadcast(s);
}
