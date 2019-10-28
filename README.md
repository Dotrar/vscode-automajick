# Automajick

Auto-(Majick): _A play on 'Automatic' and mispelt form of 'Magic'_.

A simple way to run scripts through the use of a quickpick dialog box, specified in your vscode settings.

Each `majick` can either be a command-line string or a file location, and you can choose to take focus away from the editor or not.

## Features and goals

- Works with any interpreter or command system.
- Run scripts on any open file, with sane defaults.
- Commands are loaded at invocation and will pop up as a quick-pick dialog.
- Commands are executed with the current file location as the first argv parameter. Either in your workspace or the file's directory.

Use cases could include:

- Converting one file format to the next
- Extracting data from one source to apply to another
- Managing folder-level tasks, git repos, custom sanity checks
- Compile and build scripts, setup scripts, etc

This extension allows those scripts to be written in a generic way, and activated with few button presses.

## Improvements and changes

If there's any feature requests, let us know by the way of an issue on the github page.

## Extension Settings

- `automajick.interpreter`: The command line for invoking the interpreter (default: "python")
- `automajick.commands`: A list of command objects with the following properties:

```json
{
  "label": "Script Name",
  "description": "Some extra dialog information",
  "location?": "C:/path/to/script",
  "command?": "-c \"print('hello world')\"",
  "forget?": true
}
```

Where:

- `location` is a path to a script that can be run with your chosen interpreter.
- `command` is a line of command line arguements that can be understood by your interpreter (takes precedence over location)
- `forget` is a boolean signifying a "fire and forget" type of command;
  - you will **preserve** focus in the editor if you set this to true; unset is false by default

You cannot run both a `command` and a `location`; if both are specified, the `command` will be used.

## How to use

Activate via the `` <Alt>+` `` Keypress or `Automajick Run`, you will get a quick-select popup of different scripts that you have configured to run.

Each command is ran in the form of:

```sh
cd {workspaceFolder || directoryOfCurrentFile};
{interpreter} {picked.command || picked.location} "{currentFile}"
```

- `picked.location` is a location to the script ( note: wrapped with double-quotes)
- `picked.command` is the command paramters of the script; you must escape double-quotes manually.
- `currentFile` : Is the current file you are observing in the editor.

## Defaults: made as example

You can tab-complete the parameter in vscode.settings, which will pre-populate you with the default commands:

```json
[
  {
    "label": "Hello World",
    "description": "This runs a line of python without giving focus to the terminal",
    "command": "-c \"import sys; print('hello world', sys.argv)\"",
    "forget": true
  },
  {
    "label": "Hello File",
    "description": "This runs a file somewhere, giving focus to the terminal",
    "location": "C:/test/test.py"
  },
  {
    "label": "Hello Null",
    "description": "This runs nothing and will pop up as an error box"
  }
]
```

## Release Notes

- Version 1.0.2 (this release) - changed icon and keybinding, now alt-backtick
- Version 1.0.1 - added the `command`, `location`, and `forget` parameters
- Version 1.0.0 - First real release

---
