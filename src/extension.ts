import * as vscode from "vscode"
import { appendFile } from 'fs'

let listener: vscode.Disposable

export async function activate() {
	const channel = vscode.window.createOutputChannel("keylogger")
	let last_capture = 0
	let debouncer: NodeJS.Timeout | undefined
	let buffer = ""

	const config = vscode.workspace.getConfiguration("keylogger")

	listener = vscode.workspace.onDidChangeTextDocument(e => {
		const config = vscode.workspace.getConfiguration("keylogger")
		const min_delay = config.get<number>("minDelayMs") || 0
		let max_length = config.get<number>("textMaxLength")
		if(max_length === -1)
			max_length = undefined
		const debounce_delay = config.get<number>("debounceMs") || 0

		if(e.document.fileName.match(/^extension-output-#[0-9]+$/) ||
				Date.now() - last_capture < min_delay) {
			return
		}
		last_capture = Date.now()

		buffer += e.contentChanges
			.map(change => change.text)
			.join(" --- ")
		
		if(debouncer)
			clearTimeout(debouncer)
		debouncer = setTimeout(() => {
			const line = [
				new Date().toLocaleString(),
				e.document.uri,
				buffer
					.substr(0, max_length)
			].join(" - ");
			buffer = ""
			channel.appendLine(line)
			const output_file = config.get<string>("outputFile");
			if(output_file) {
				appendFile(output_file, line + "\n", (err) => {
					if(err)
						console.error(err)
				})
			}
		}, debounce_delay)
	})
}

export function deactivate() {
	listener.dispose()
}
