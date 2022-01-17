function executeAndVerifySelection(callback, instructions, expected, useCommandEditor,
                                   selectionStart, selectionEnd)
{
    FBTrace.sysout("executeSelection executeAndVerifySelection : instructions : \"" +
                    instructions + "\"; useCommandEditor : " +
                    useCommandEditor + "; expect : "+expected);
    FBTest.clearConsole();
    FBTest.clearAndTypeCommand(instructions, useCommandEditor);

    if (selectionStart !== undefined)
    {
        var cmdLine = FW.Firebug.CommandLine.getCommandLine(FW.Firebug.currentContext);
        cmdLine.setSelectionRange(selectionStart, selectionEnd || cmdLine.value.length);
    }

    var config = {tagName: "div", classes: "logRow logRow-command"};
    FBTest.waitForDisplayedElement("console", config, function(row)
    {
        var panelNode = FBTest.getPanel("console").panelNode;
        var rows = panelNode.querySelectorAll(".logRow .objectBox-text");
        if (FBTest.compare(2, rows.length, "There must be two logs"))
        {
            FBTest.compare(expected, rows[1].textContent, "\"" + expected + "\" must be shown");
        }
        callback();
    });

    FW.Firebug.CommandLine.enter(FW.Firebug.currentContext);
}