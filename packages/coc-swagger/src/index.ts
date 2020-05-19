import {
  commands,
  CompleteResult,
  ExtensionContext,
  sources,
  workspace,
} from "coc.nvim";
import { render } from "./render";

let initialBufNumber: number;
let initialUri: string;

function registerAutocmd(context: ExtensionContext) {
  // event BufWritePost / InsertLeave / TextChangedI
  context.subscriptions.push(
    workspace.registerAutocmd({
      event: "BufWritePost",
      request: true,
      callback: async () => {
        if (workspace.uri === initialUri) {
          return await render();
        }

        const { nvim } = workspace;
        const bufnr = await nvim.call("bufnr", "%");

        if (bufnr === initialBufNumber) {
          return await render();
        }
      },
    })
  );
}

export async function activate(context: ExtensionContext): Promise<void> {
  context.subscriptions.push(
    commands.registerCommand("swagger.render", async () => {
      const { nvim } = workspace;
      initialBufNumber = await nvim.call("bufnr", "%");
      initialUri = workspace.uri;

      await render();
      registerAutocmd(context);
    })
  );
}
