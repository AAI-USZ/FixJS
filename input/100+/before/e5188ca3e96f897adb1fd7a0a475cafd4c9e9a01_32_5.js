function(target, panel, value, textSize)
    {
        this.target = target;
        this.panel = panel;
        this.editingElements = [target.repObject, null];

        this.panel.panelNode.appendChild(this.box);

        this.input.value = value;
        this.input.focus();

        var command = Firebug.chrome.$("cmd_toggleHTMLEditing");
        command.setAttribute("checked", true);
    }