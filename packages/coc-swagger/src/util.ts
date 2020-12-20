import { workspace, Document } from "coc.nvim";
import * as yaml from "yaml";

export async function getCurrentBufferContent(): Promise<string> {
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
