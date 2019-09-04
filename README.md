# vscode-automajick README

Run scripts automajickly

## Features

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings



* `automajick.interpreter`: string to the interpreter, must be available via CMD, can be complete string 
* `automajick.commands`: a list of command types that have the following properties:

```json
{
  "label": "Short name of what the script does",
  "location" : "C:/Location/To/Script.py"
}
```

Each script/command will be run in the form of:

```sh
 {interpreter} "{command.location}" "{current_observed_file}"
```

Where:

* `current_observed_file` : Is the current file you have opened on the editor.
* `command.location` : is the location tag of the command you have selected.
* **cwd** is set to the *workspace* folder; or if that is not open, the folder of `current_observed_file`

## Known Issues

NA

## Release Notes

Version 0.0.1 - first release!

-----------------------------------------------------------------------------------------------------------
