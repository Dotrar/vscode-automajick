# Automajick

Run scripts on your work simply and automajickly

## Features

- Use whatever language you want
- Run scripts from anywhere; in the current workspace and with the current file, using stdio and argv
- Quick and easy

## What is the use of this?

Use cases could include:

- Converting one file format to the next
- Extracting data from one source to apply to another
- Managing folder-level tasks, git repos, custom sanity checks
- Compile and build scripts, setup scripts, etc

Generally, at my workplace I manage many different projects and folders for different things; I mainly use python scripts to automate many tasks across folders and on files; for instance: using a python script to convert md to html, extracting data, zip'ing, managing github when required, etc.

This extension allows those scripts to be written in a generic way, and activated with few button presses.

## Requirements

None, but you will need scripts that you want to run, and a `interpreter` to run them. Python is used by way of example; if your interpreter needs special consideration, hit us up in the form of an issue.

## Extension Settings

- `automajick.interpreter`: The command line for invoking the interpreter
- `automajick.commands`: A list of command objects with the following properties:

```json
{
  "label": "Short name of what the script does",
  "location" : "C:/Location/To/Script.py"
}
```

Then with the `<Ctrl><F1>` Keypress, you will get a quick-select popup of *labels* configured to run the command in the form of:

```sh
{interpreter} "{chosen.location}" "{current_observed_file}"
```

Local to either the current workspace folder or the directory of the file.

Where:

- `current_observed_file` : Is the current file you have opened on the editor.
- `chosen.location` : is the location tag of the command you have selected.
- **cwd** is set to the *workspace* folder; or if that is not open, the folder of `current_observed_file`

## Release Notes

Version 0.0.1 - First release; suggestions in the form of issues are well encouraged.

-----------------------------------------------------------------------------------------------------------
