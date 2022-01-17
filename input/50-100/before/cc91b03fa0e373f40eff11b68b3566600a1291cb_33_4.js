function()
    {
        Events.removeEventListener(this.panelNode, "mousedown", this.onMouseDown, false);
        Events.removeEventListener(this.panelNode, "click", this.onClick, false);

        Firebug.Panel.destroyNode.apply(this, arguments);
    }