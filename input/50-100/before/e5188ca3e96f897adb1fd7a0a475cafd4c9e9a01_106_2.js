function(state)
    {
        state.scrollTop = this.panelNode.scrollTop ? this.panelNode.scrollTop : this.lastScrollTop;

        Persist.persistObjects(this, state);

        this.stopEditing();

        Firebug.Panel.destroy.apply(this, arguments);
    }