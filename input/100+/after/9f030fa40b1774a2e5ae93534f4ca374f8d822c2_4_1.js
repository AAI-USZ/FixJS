function()
{
    window.removeEventListener("load", FBTraceFirebugOverlay.initialize, false);

    // Customization of Firebug's menu.
    var handler = FBTraceFirebugOverlay.onFirebugMenuShowing.bind(FBTraceFirebugOverlay);
    document.addEventListener("firebugMenuShowing", handler, false);
}