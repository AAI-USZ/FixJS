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
                id: "menu_openTraceConsole",
                label: "Open_Firebug_Tracing",
                command: "cmd_openTraceConsole",
                insertbefore: "menu_aboutSeparator",
                "class": "fbInternational",
                key: "key_openTraceConsole"
            })
        ]);

        // Always Open Test Console (option)
        var optionsPopup = parent.querySelector("#FirebugMenu_OptionsPopup");
        $menupopupOverlay(optionsPopup, [
            $menuitem({
                id: "FirebugMenu_Options_alwaysOpenTraceConsole",
                type: "checkbox",
                label: "Always_Open_Firebug_Tracing",
                oncommand: "FBTraceFirebugOverlay.onToggleOption(this)",
                insertbefore: "menu_optionsSeparator",
                option: "alwaysOpenTraceConsole"
            })
        ]);
    }
}