function(state)
    {
        if (FBTrace.DBG_NET)
            FBTrace.sysout("net.netPanel.show; " + this.context.getName(), state);

        var enabled = Firebug.NetMonitor.isAlwaysEnabled();
        this.showToolbarButtons("fbNetButtons", enabled);

        if (enabled)
            Firebug.chrome.setGlobalAttribute("cmd_firebug_togglePersistNet", "checked", this.persistContent);
        else
            this.table = null;

        if (!enabled)
            return;

        if (!this.filterCategory)
            this.setFilter(Firebug.netFilterCategory);

        this.layout();

        if (!this.layoutInterval)
            this.layoutInterval = setInterval(Obj.bindFixed(this.updateLayout, this), layoutInterval);

        if (this.wasScrolledToBottom)
            Dom.scrollToBottom(this.panelNode);
    }