import * as vscode from "vscode";
import { CodeLensProvider } from "./codeLensProvider";
import { TEST_FILE_PATTERNS } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerCodeLensProvider(
    TEST_FILE_PATTERNS.map(tfp => ({
      pattern: tfp,
      scheme: "file"
    })),
    new CodeLensProvider()
  );

  vscode.commands.registerCommand("jestRun.run", args => {
    const terminal = vscode.window.createTerminal("Jest Run");

    terminal.show();
    terminal.sendText(args);
  });
}

export function deactivate() {}
