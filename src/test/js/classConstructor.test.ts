import * as path from "path";
import * as assert from "assert";
import * as vscode from "vscode";
import { openDocument } from "../helpers";
import Mocha from "mocha";

test("Insert log message related to a class constructor param", async () => {
    await openDocument("../files/js/classConstructor.js");
    const { activeTextEditor } = vscode.window;
    if (activeTextEditor) {
        activeTextEditor.selections = [
            new vscode.Selection(
                new vscode.Position(1, 14),
                new vscode.Position(1, 22)
            ),
        ];
        await vscode.commands.executeCommand("gofmt.displayLogMessage", []);
        const textDocument = activeTextEditor.document;
        const logMessage = textDocument.lineAt(2).text;
        assert.strictEqual(/console\.log\(.*/.test(logMessage), true);
        // Class name
        assert.strictEqual(logMessage.includes("Person"), true);
        // Function name
        assert.strictEqual(logMessage.includes("constructor"), true);
    }
    Mocha.afterEach(async () => {
        await vscode.commands.executeCommand(
            "workbench.action.closeActiveEditor",
            []
        );
    });
});
