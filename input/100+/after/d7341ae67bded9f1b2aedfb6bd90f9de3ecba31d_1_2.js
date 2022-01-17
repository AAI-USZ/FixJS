function(context)
    {
        // Command line on other panels is never multiline.
        var visible = Firebug.CommandLine.Popup.isVisible();
        return visible && context.panelName != "console";
    }