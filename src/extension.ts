import * as vscode from "vscode";
import { CodeLensProvider } from "./codeLensProvider";

export function activate(context: vscode.ExtensionContext) {
  const codeLensProvider = new CodeLensProvider();

  vscode.languages.registerCodeLensProvider("*", codeLensProvider);

  vscode.commands.registerCommand("jestRun.run", args => {
    const terminal = vscode.window.createTerminal("Jest Run");

    terminal.show();
    terminal.sendText(args);
  });
}

export function deactivate() {}
