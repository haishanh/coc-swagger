import {
  commands,
  // CompleteResult,
  ExtensionContext,
  // sources,
  workspace,
} from "coc.nvim";
import * as render from "./render";
import { logger } from "./logger";

let initialBufNumber: number;
let initialUri: string;

function registerAutocmd(context: ExtensionContext) {
  // event BufWritePost / InsertLeave / TextChangedI
  context.subscriptions.push(
    workspace.registerAutocmd({
      event: "BufWritePost",
      request: true,
      callback: async () => {
        logger.log(`workspace.uri = ${workspace.uri}`);

        if (workspace.uri === initialUri) {
          return await render.refresh();
        }

        const { nvim } = workspace;
        const bufnr = await nvim.call("bufnr", "%");

        if (bufnr === initialBufNumber) {
          return await render.refresh();
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

      await render.render(true);
      registerAutocmd(context);
    })
  );
}
