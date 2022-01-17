function(expression)
    {
        if (FBTrace.DBG_WATCH)
            FBTrace.sysout("Firebug.WatchPanel.addWatch; expression: "+expression);

        if (!this.watches)
            this.watches = [];

        for (var i=0; i<this.watches.length; i++)
        {
            if (expression == this.watches[i])
                return;
        }

        this.watches.splice(0, 0, expression);
        this.rebuild(true);
    }