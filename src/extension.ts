// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import * as path from "path";

//const outputChannel = vscode.window.createOutputChannel('Automajick');

type command = {
  [label: string]: string;
  label: string;
  location: string;
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  const autoTerminal = vscode.window.createTerminal("Automajick");
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("automajick.run", () => {
    // The code you place here will be executed every time your command is executed

    const commands: [command] | null =
      vscode.workspace.getConfiguration("automajick").get("commands") || null;

    if (commands === null) {
      vscode.window.showInformationMessage("You have no scripts configured!");
      return;
    }

    // yes, we can one day make a QuickPickCommandItem
    let items: Array<vscode.QuickPickItem> = [];

    for (const key in commands) {
      items.push({
        label: commands[key].label,
        description: commands[key].location
      });
    }

    vscode.window.showQuickPick(items).then(selection => {
      if (selection === undefined) {
        // cancelled command, be quiet
        return;
      }

      let script: string | undefined = selection.description;
      let interp: string | undefined = vscode.workspace
        .getConfiguration("automajick")
        .get("interpreter");

      if (interp === undefined || script === undefined) {
        vscode.window.showInformationMessage(
          "Things are undefined, check your options!"
        );
        return;
      }

      const editor = vscode.window.activeTextEditor;

      if (editor === undefined) {
        vscode.window.showErrorMessage("No File opened!");
        return;
      }

      let p = path.posix;
      let clear = "clear";

      if (process.platform === "win32") {
        p = path.win32;
        clear = "cls";
      }

      const observedFile = p.normalize(editor.document.fileName);

      let workingDirectory: string | null = null; 

      if (vscode.workspace.workspaceFolders === undefined) {
        workingDirectory = p.dirname(observedFile);
      }
      /*
      if (vscode.workspace.workspaceFolders !== undefined) {
        workingDirectory = p.normalize(
          vscode.workspace.workspaceFolders[0].uri.fsPath
        );
      }
      */

      /* run the interpreter on script given the currentfile in filepath */
      const target = `${clear}\n ${interp} "${script}" "${observedFile}"`;

      /* First up, clear the channel, then start */

      if(workingDirectory !== null) {
        autoTerminal.sendText(`cd "${workingDirectory}"\n`);
      }

      autoTerminal.sendText(target);
      autoTerminal.show(false);
      /*
      outputChannel.clear();
      outputChannel.show(true);
      let proc = child.exec(target, { cwd: workingDirectory }, function(
        error,
        stdout,
        stderr
      ) {
        if (stdout !== null) {
          outputChannel.append(`${stdout.toString()}\n`);
        }

        if (stderr !== null && stderr !== '') {
          let e = stderr.toString();
          outputChannel.append(`err: ${e}`);
          vscode.window.showErrorMessage(e);
        } else if (error !== null) {
          outputChannel.append(`procERR: ${error}`);
          vscode.window.showErrorMessage(`${error}`);
        }
      });
      */
    });
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
