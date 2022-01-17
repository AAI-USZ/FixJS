function(target, panel, value, textSize)
    {
        this.target = target;
        this.panel = panel;
        var el = target.repObject;
        if (this.innerEditMode)
        {
            this.editingParent = el;
        }
        else
        {
            this.editingRange = el.ownerDocument.createRange();
            this.editingRange.selectNode(el);
            this.originalLocalName = el.localName;
        }

        this.panel.panelNode.appendChild(this.box);

        this.input.value = value;
        this.input.focus();

        var command = Firebug.chrome.$("cmd_firebug_toggleHTMLEditing");
        command.setAttribute("checked", true);
    }