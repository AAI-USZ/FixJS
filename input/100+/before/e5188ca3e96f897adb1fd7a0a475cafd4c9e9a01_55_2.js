function(target)
{
    var self = this;
    window.Firebug.GlobalUI.startFirebug(function()
    {
        Firebug.chrome.onToggleOption(target);

        // Open automatically if set to "always open", close otherwise.
        if (Firebug.getPref(Firebug.prefDomain, "alwaysOpenTestConsole"))
            this.open();
        else
            this.close();
    });
}