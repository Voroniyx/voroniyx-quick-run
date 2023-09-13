'use strict';

import { ExtensionContext, WorkspaceConfiguration, commands, window, workspace } from 'vscode';

type WorkspaceConfig = WorkspaceConfiguration & {
	js: {
		commandToExecute: string
	},
	ts: {
		commandToExecute: string
	}
}

export function activate(context: ExtensionContext) {


	function executeCommand(command: 'ts' | 'js') {
		const config = workspace.getConfiguration("voroniyx") as WorkspaceConfig;
		const terminal = window.createTerminal(`Quick Command`);


		switch (command) {
			case 'js': {
				terminal.show();
				terminal.sendText(config.js.commandToExecute)
				break;
			}
			case 'ts': {
				terminal.show();
				terminal.sendText(config.ts.commandToExecute)
				break;
			}
			default: {
				terminal.show();
				terminal.sendText('echo No command found')
				break;
			}
		}
	}

	//! JavaScript
	context.subscriptions.push(commands.registerCommand('voroniyx.terminal.js', () => {
		executeCommand('js');
	}));



	//! TypeScript
	context.subscriptions.push(commands.registerCommand('voroniyx.terminal.ts', () => {
		executeCommand('ts');
	}));

	//! Maybe Vue and Vite Commands
}
