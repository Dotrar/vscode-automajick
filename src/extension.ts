// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import * as path from "path";

//const outputChannel = vscode.window.createOutputChannel('Automajick');

interface QuickPickAutoMajickItems extends vscode.QuickPickItem {
  label: string;
  description: string;
  location?: string;
  command?: string;
  forget?: boolean;
}

export function activate(context: vscode.ExtensionContext) {
  //this was originally outputChannel but terminals are nicer

  const autoTerminal = vscode.window.createTerminal("Automajick");

  let disposable = vscode.commands.registerCommand("automajick.run", () => {

    const commands: [QuickPickAutoMajickItems] | null =
      vscode.workspace.getConfiguration("automajick").get("commands") || null;

    if (commands === null) {
      vscode.window.showErrorMessage(
        "You have an empty set of AutoMajick Commands!"
      );
      return;
    }

    vscode.window.showQuickPick(commands).then(selection => {
      if (selection === undefined) {
        // cancelled command, be quiet
        return;
      }

      let interp: string | undefined = vscode.workspace
        .getConfiguration("automajick")
        .get("interpreter");

      if (interp === undefined) {
        vscode.window.showInformationMessage(
          "You have no interpreter selected! check your settings"
        );
        return;
      }

      let script: string | undefined = selection.command || selection.location;

      if (script === undefined) {
        vscode.window.showErrorMessage(
          `Your Majick ${selection.label} has no command nor location`
        );
        return;
      }

      if (script === selection.location) {
        // wrap in quotes if it is a location, shells will love you for it
        script = `"${script}"`;
        // let the interpreter 404 if required; users always know what they are doing :^)
      }

      const editor = vscode.window.activeTextEditor;

      if (editor === undefined) {
        vscode.window.showErrorMessage("No File opened!");
        return;
      }

      let p = path.posix;
      let clear = "clear";

      if (process.platform === "win32") {
        // set windows defined options here
        p = path.win32;
        clear = "cls";
      }

      const observedFile = p.normalize(editor.document.fileName);

      let anonymousDirectoryChange: string | null = null;

      if (vscode.workspace.workspaceFolders === undefined) {
        anonymousDirectoryChange = p.dirname(observedFile);
      }

      /* run the interpreter on script given the currentfile in filepath */
      const target = `${clear}\n ${interp} ${script} "${observedFile}"`;

      /* First up, clear the channel, then start */
      if (anonymousDirectoryChange !== null) {
        autoTerminal.sendText(`cd "${anonymousDirectoryChange}"\n`);
      }

      autoTerminal.sendText(target);
      autoTerminal.show( selection.forget || false);
    });
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  // Do we have to do anything here?
}
