import { workspace, Document } from "coc.nvim";
import * as yaml from "yaml";
import open from "open";
import getPort from "get-port";

import * as server from "./server";
import * as ws from "./ws";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getCurrentBufferContent(): Promise<string> {
  const { nvim } = workspace;
  const bufnr = await nvim.call("bufnr", "%");
  // workspace.showMessage(`bufnr ${bufnr}, ${workspace.uri}`);
  const doc: Document = workspace.getDocument(bufnr);
  // const opts = await nvim.call('coc#util#get_bufoptions', bufnr)

  let cnt = {};
  try {
    cnt = yaml.parse(doc.content);
    return JSON.stringify(cnt);
  } catch (err) {
    // TODO diagnostic info?
    workspace.showMessage(
      "Failed to parse buffer content as yaml or json",
      "error"
    );
    throw new Error("Failed to parse API spec");
  }
}

let port: number;

export async function render() {
  if (!port) {
    workspace.showMessage("starting server");
    port = await getPort();
    workspace.showMessage(`${port}`);

    try {
      server.start(port);
    } catch (e) {
      workspace.showMessage(
        `failed to start local http server listen on ${port}`,
        "error"
      );
      throw e;
    }

    const url = `http://localhost:${port}`;
    await sleep(0);
    open(url);
    await sleep(2000);
  }

  const s = await getCurrentBufferContent();
  ws.send(s);
}
