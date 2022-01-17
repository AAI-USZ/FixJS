function(target, panel, value, textSize)
    {
        this.target = target;
        this.panel = panel;

        this.panel.panelNode.appendChild(this.box);

        this.input.value = value;
        this.input.focus();

        // match CSSModule.getEditorOptionKey
        var command = Firebug.chrome.$("cmd_togglecssEditMode");
        command.setAttribute("checked", true);
    }