function()
    {
        var command = Firebug.chrome.$("cmd_firebug_toggleHTMLEditing");
        command.setAttribute("checked", false);

        this.panel.panelNode.removeChild(this.box);

        delete this.editingParent;
        delete this.editingRange;
        delete this.originalLocalName;
        delete this.target;
        delete this.panel;
    }