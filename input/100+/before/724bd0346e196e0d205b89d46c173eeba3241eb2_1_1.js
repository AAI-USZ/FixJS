function(event)
{
    if (!Firebug.GlobalUI)
        return;

    var parent = event.detail;

    // Extend Firebug menu
    with (Firebug.GlobalUI)
    {
        // Open Test Console
        $menupopupOverlay(parent, [
            $menuseparator({
                insertbefore: "menu_aboutSeparator",
            }),
            $menuitem({
                id: "menu_openTestConsole",
                label: "Open Test Console",
                command: "cmd_openTestConsole",
                insertbefore: "menu_aboutSeparator",
                key: "key_openTestConsole"
            })
        ]);

        $command("cmd_openTestConsole", "FBTestFirebugOverlay.open()");
        $key("key_openTestConsole", "t", "shift", "cmd_openTestConsole");

        // Always Open Test Console (option)
        var optionsPopup = parent.querySelector("#FirebugMenu_OptionsPopup");
        $menupopupOverlay(optionsPopup, [
            $menuitem({
                id: "FirebugMenu_Options_alwaysOpenTestConsole",
                type: "checkbox",
                label: "Always Open Test Console",
                oncommand: "FBTestFirebugOverlay.onToggleOption(this)",
                insertbefore: "menu_optionsSeparator",
                option: "alwaysOpenTestConsole"
            })
        ]);
    }
}