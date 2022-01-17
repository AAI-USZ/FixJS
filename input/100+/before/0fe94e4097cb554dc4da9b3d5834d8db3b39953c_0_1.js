function (require, exports, module) {
    'use strict';
    
    // Brackets modules
    var CommandManager      = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        DocumentManager     = brackets.getModule("document/DocumentManager"),
        Menus               = brackets.getModule("command/Menus");

    // Define the functions that Commands will execute
    function TestCommand1() {
        var command1 = CommandManager.get("custom.command1");
        if (!command1) {
            return;
        }
        var command2 = CommandManager.get("custom.command2");
        if (!command2) {
            return;
        }

        var checked = command1.getChecked();
        if (checked) {
            alert("Unchecking self. Disabling next.");
            command2.setEnabled(false);
        } else {
            alert("Checking self. Enabling next.");
            command2.setEnabled(true);
        }
        command1.setChecked(!checked);
    }
    
    function TestCommand2() {
        alert("Executing command 2");
    }

    function TestCommand3() {
        alert("Executing command 3");
    }
    
    // Register the functions as commands
    var command1 = CommandManager.register("Toggle Checkmark", "custom.command1", TestCommand1);
    var command2 = CommandManager.register("Enabled when previous is Checked", "custom.command2", TestCommand2);
    var command3 = CommandManager.register("Enabled when text selected", "custom.command3", TestCommand3);

    // Set the Command initial state
    command1.setChecked(true);
    command2.setEnabled(true);
    command3.setEnabled(false);

    // Update the MenuItem by changing the underlying command
    var updateEnabledState = function () {
        var editor = EditorManager.getFocusedEditor();
        command3.setEnabled(editor && editor.getSelectedText() !== "");
    };
    var editor_cmenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    $(editor_cmenu).on("beforeContextMenuOpen", updateEnabledState);

    
    // Add the Commands as MenuItems of the Editor context menu
    if (editor_cmenu) {
        editor_cmenu.addMenuDivider();
        editor_cmenu.addMenuItem("custom.command1");
        editor_cmenu.addMenuItem("custom.command2");
        editor_cmenu.addMenuItem("custom.command3");
    }
}