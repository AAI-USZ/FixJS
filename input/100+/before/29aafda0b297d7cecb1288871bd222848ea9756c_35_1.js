function()
{
    if (FBTrace.DBG_FBTEST)
        FBTrace.sysout("FBTest.overlayFirebug.onLoad; scope: " + window.location);

    window.removeEventListener("load", FBTestFirebugOverlay.onLoad, false);

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

    if (FBTrace.DBG_FBTEST)
        FBTrace.sysout("FBTest.overlayFirebug.initialize; scope: " + window.location);

    // abandon ship if we are loaded by chromebug
    var winURL = window.location.toString();
    if (winURL == "chrome://chromebug/content/chromebug.xul")
        return;

    try
    {
        // Open console if the command line says so or if the pref says so.
        var cmd = cmdLineHandler.wrappedJSObject;
        if (cmd.runFBTests)
            FBTestFirebugOverlay.open(cmd.testListURI);
        else if (getPref("alwaysOpenTestConsole"))
            FBTestFirebugOverlay.open();
    }
    catch (e)
    {
        // xxxHonza: Firebug not initialized yet? (note that modules are loaded asynchronously)
        if (FBTrace.DBG_ERRORS)
            FBTrace.sysout("fbtest.overlayFirebug.initialize; EXCEPTION " + e, e);
    }
}