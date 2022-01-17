function()
{
    window.removeEventListener("load", FBTraceFirebugOverlay.initialize, false);

    if (!Firebug.GlobalUI)
        return;

    // Extend Firebug menu
    with (Firebug.GlobalUI)
    {
        // Extend Firebug global menu (more instances exists).
        var parents = document.getElementsByClassName("fbFirebugMenuPopup");
        for (var i=0; i<parents.length; i++)
        {
            var parent = parents[i];

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

            $command("cmd_openTraceConsole", "FBTraceFirebugOverlay.openConsole()");
            $key("key_openTraceConsole", "r", "shift", "cmd_openTraceConsole");

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
}