function()
    {
        var command = Firebug.chrome.$("cmd_firebug_togglecssEditMode");
        command.setAttribute("checked", false);

        if (this.box.parentNode == this.panel.panelNode)
            this.panel.panelNode.removeChild(this.box);

        delete this.target;
        delete this.panel;
        delete this.styleSheet;
    }