import * as vscode from "vscode";
import { parse } from "jest-editor-support";

export class CodeLensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];

  private createRunCommand = (args: {
    file: string;
    name: string;
    type: string;
  }): vscode.Command => {
    return {
      command: "jestRun.run",
      title: args.type === "describe" ? "Run block" : "Run",
      arguments: [`npm test -- -u -t=\"${args.name}\"`],
      tooltip: "Run"
    };
  };

  private createLens = (
    line: number,
    column: number,
    args: {
      file: string;
      name: string;
      type: string;
    }
  ): vscode.CodeLens => {
    const lens = new vscode.Range(line - 1, column - 1, line - 1, column - 1);
    const runCodeLens = new vscode.CodeLens(lens, this.createRunCommand(args));

    return runCodeLens;
  };

  public provideCodeLenses(
    document: vscode.TextDocument
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    this.codeLenses = [];

    const path = document.uri.fsPath;
    const parsedPath = parse(path);

    if (parsedPath.describeBlocks.length > 0) {
      parsedPath.describeBlocks.forEach(db => {
        const lens = this.createLens(db.start.line, db.start.column, {
          file: db.file,
          name: db.name,
          type: db.type
        });

        this.codeLenses.push(lens);
      });
    }

    if (parsedPath.itBlocks.length > 0) {
      parsedPath.itBlocks.forEach(it => {
        const lens = this.createLens(it.start.line, it.start.column, {
          file: it.file,
          name: it.name,
          type: it.type
        });

        this.codeLenses.push(lens);
      });
    }

    return this.codeLenses;
  }
}
