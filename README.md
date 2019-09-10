# Automajick

Run scripts on your work simply and automajickly using a simple list of quickpick items in your vscode settings.

Each `Majick` command (working title) can either be a command-line string or a file location, and you can choose to take focus or not.
Examples are written with python in mind but you can use any interpreter, read on about how it works..

## Features

- Use whatever program and parameters you want
- Run scripts from anywhere; cwd'd into the current workspace and with the current file, using stdio and argv
- Quick and easy to set up; put changes in your vscode.settings and run the command again.

### Contributions

We're happy to accept feature requests or comments on how you want it to be used, without straying too far off the path.

## Extension Settings

- `automajick.interpreter`: The command line for invoking the interpreter (default: "python")
- `automajick.commands`: A list of command objects with the following properties:

```json
{
  "label": "Short name of what the script does",
  "description" : "Some text to help you remember",
  "location?" : "C:/Location/To/Script.py",
  "command?" : "-c \"print('hello world')\"",
  "forget?" : true
}
```

Where:

- `location` is a path to a script that can be run with your chosen interpreter
- `command` is a line of command line arguements that can be understood by your interpreter (takes precedence over location)
- `forget` is a boolean signifying a "fire and forget" type of command; you will **preserve** focus in the editor if you set this to true, (*undefined means false by default*).

You cannot run both a `command` and a `location`; if both are specified, the `command` will be used.

## How to use

Simply use `automajick.run` or the `<Ctrl><F1>` Keypress, you will get a quick-select popup of *labels* configured to run the command in the form of:

```sh
{interpreter} "{chosen.command or location}" "{current_observed_file}"
```

- `current_observed_file` : Is the current file you have opened on the editor.
- **cwd** is set to the *workspace* folder; or if that is not open, the folder of `current_observed_file`

## What this could be used for

Use cases could include:

- Converting one file format to the next
- Extracting data from one source to apply to another
- Managing folder-level tasks, git repos, custom sanity checks
- Compile and build scripts, setup scripts, etc

Generally, at my workplace I manage many different projects and folders for different things; I mainly use python scripts to automate many tasks across folders and on files; for instance: using a python script to convert md to html, extracting data, zip'ing, managing github when required, etc.

This extension allows those scripts to be written in a generic way, and activated with few button presses.

## Requirements

None, but you will need scripts that you want to run, and a `interpreter` to run them. Python is used by way of example; if your interpreter needs special consideration, hit us up in the form of an issue.

## Defaults: made as example

```json
"default": [
  {
    "label": "Hello World",
    "description" : "This runs a line of python without giving focus to the terminal",
    "command": "-c \"import sys; print('hello world', sys.argv)\"",
    "forget": true
  },
  {
    "label" : "Hello File",
    "description" : "This runs a file somewhere, giving focus to the terminal",
    "location": "C:/test/test.py"
  },
  {
    "label" : "Hello Null",
    "description" : "This runs nothing and will pop up as an error box"
  }
]
```

## Release Notes

- Version 1.0.1 (this release) - added the `command`, `location`, and `forget` parameters
- Version 1.0.0 - Fixed up vsce, made an icon, made it work proper
- Version 0.0.1 - First release; suggestions in the form of issues are well encouraged.

-----------------------------------------------------------------------------------------------------------
