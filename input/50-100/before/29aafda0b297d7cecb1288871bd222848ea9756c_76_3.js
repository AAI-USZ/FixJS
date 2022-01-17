function(oldPanelNode)
    {
        Events.addEventListener(this.panelNode, "mousedown", this.onMouseDown, false);
        Events.addEventListener(this.panelNode, "click", this.onClick, false);

        Firebug.Panel.initializeNode.apply(this, arguments);
    }