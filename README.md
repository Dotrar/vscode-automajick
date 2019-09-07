# Automajick

Run scripts on your work simply and automajickly

## Features

- Use whatever language you want
- Run scripts from anywhere; in the current workspace and with the current file as the first param
- Quick and easy

## What would this be used for?

Generally I work on many different projects and have different python scripts to manage github repos, readme conversions, auto-zippers, and etc.
This script allows someone like me to run the chosen python scripts at the push of a button.

## Requirements

None, but you will need scripts that you want to run, and a `interpreter` to run them. Python is used by way of example; if your interpreter needs special consideration, hit us up in the form of an issue.

## Extension Settings

- `automajick.interpreter`: The command for invoking the interpreter
- `automajick.commands`: A list of command objects with the following properties:

```json
{
  "label": "Short name of what the script does",
  "location" : "C:/Location/To/Script.py"
}
```

Each script/command will be run in the form of:

```sh
{interpreter} "{current_observed_file}"
```

Local to the current workspace folder or the directory of the file.

Where:

- `current_observed_file` : Is the current file you have opened on the editor.
- `command.location` : is the location tag of the command you have selected.
- **cwd** is set to the *workspace* folder; or if that is not open, the folder of `current_observed_file`

## Release Notes

Version 0.0.1 - First release; suggestions in the form of issues are well encouraged.

-----------------------------------------------------------------------------------------------------------
