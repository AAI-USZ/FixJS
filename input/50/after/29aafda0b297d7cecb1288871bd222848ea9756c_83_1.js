function()  // TODO chrome.js
    {
        window.removeEventListener("unload", shutdownFirebug, false);

        Events.dispatch(modules, "disable", [Firebug.chrome]);
    }