# keylogger

Minimalistic extension that logs basic text input events with their timestamp like this:

```
3/18/2021, 10:57:58 PM - untitled:Untitled-1 - hello world
3/18/2021, 10:58:13 PM - untitled:Untitled-1 - 
x = 1+ 2
3/18/2021, 10:58:14 PM - untitled:Untitled-1 -  
3/18/2021, 10:58:30 PM - untitled:Untitled-1 - = 4- 1
3/18/2021, 10:58:49 PM - untitled:Untitled-1 - multi
line
text
```

It is outputted into an output channel (tab) "keylogger", optionally to file.

## Features

- Configurable debounce, delay, max length and output file values (see below)
- Only text inputs are recorded (via `vscode.workspace.onDidChangeTextDocument`), no modifier keys etc. Pasted text will also be included.
- Useful for reconstructing activity for when you need to track times, for example – or to gather data for personal statistics. Not really useful for backup strategies, however. If you need that, check out a local history extension instead.

## Extension Settings

```json
"keylogger.debounceMs": {
    "type": "integer",
    "default": 1000,
    "description": "Debounce delay in milliseconds. If you set this to something greater than 0, the extension will buffer your input until the delay has elapsed and then log it out combined. The setting keylogger.textMaxLength will be applied to the resulting combined string."
},
"keylogger.minDelayMs": {
    "type": "integer",
    "default": -1,
    "description": "The minimum delay between two events in milliseconds. Faster inputs are simply ignored. Set to <= 0 to log everything."
},
"keylogger.textMaxLength": {
    "type": "integer",
    "default": -1,
    "description": "Set a maximum length of each captured text. Everything above is cut off. A value of 0 effectively omits the typed keys in the log. Set to -1 to not cut off anything."
},
"keylogger.outputFile": {
    "type": "string",
    "default": "",
    "description": "Input a file path to log to, *additionally* to the output channel. Set to an empty string to not write out to any file."
}
```

## About

This extension is hosted at https://github.com/phil294/vscode-keylogger. I have no plans for further development, but I will gladly accept your PRs.