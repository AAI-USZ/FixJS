function()
    {
        // Update label and tooltip text of the edit button.
        var mode = this.getCurrentEditorName();
        if (!mode)
            return;

        var menuitem = Firebug.chrome.$("menu_" + this.getEditorOptionKey() + mode);

        var command = Firebug.chrome.$("cmd_toggle"+this.getEditorOptionKey());
        command.setAttribute("label", menuitem.label);
        command.setAttribute("tooltiptext", menuitem.tooltipText);
    }