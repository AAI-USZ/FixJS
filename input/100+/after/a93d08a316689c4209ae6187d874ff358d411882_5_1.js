function()
{
    if (FBTrace.DBG_FBTEST)
        FBTrace.sysout("FBTest.overlayFirebug.onLoad; scope: " + window.location);

    window.removeEventListener("load", FBTestFirebugOverlay.onLoad, false);

    // Customization of Firebug's menu.
    var handler = FBTestFirebugOverlay.onFirebugMenuShowing.bind(FBTestFirebugOverlay);
    document.addEventListener("firebugMenuShowing", handler, false);

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