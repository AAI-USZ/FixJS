function(context)
    {
        // Command line on other panels is never multiline.
        var visible = Firebug.CommandLine.Popup.isVisible();
        if (visible && context.panelName != "console")
            return this.getSingleRowCommandLine();

        return Firebug.commandEditor
            ? this.getCommandEditor()
            : this.getSingleRowCommandLine();
    }