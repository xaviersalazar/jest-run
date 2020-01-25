import * as vscode from "vscode";

export class CodeLensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];

  public provideCodeLenses(
    document: vscode.TextDocument
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    this.codeLenses = [];
    const regex = new RegExp(/(it\()/gm);
    const text = document.getText();
    let matches;

    while ((matches = regex.exec(text)) !== null) {
      const line = document.lineAt(document.positionAt(matches.index).line);
      const indexOf = line.text.indexOf(matches[0]);
      const position = new vscode.Position(line.lineNumber, indexOf);
      const range = document.getWordRangeAtPosition(
        position,
        new RegExp(regex)
      );
      if (range) {
        this.codeLenses.push(new vscode.CodeLens(range));
      }
    }

    return this.codeLenses;
  }

  public resolveCodeLens(codeLens: vscode.CodeLens) {
    codeLens.command = {
      title: "Run",
      tooltip: "Jest Run",
      command: "jestRun.run",
      arguments: ["jest -t", true]
    };
    return codeLens;
  }
}
