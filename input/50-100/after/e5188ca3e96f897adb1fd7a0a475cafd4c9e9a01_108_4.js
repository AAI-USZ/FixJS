function(context, win)
    {
        context.removeEventListener(win, "mouseover", this.onHoverChange, false);
        context.removeEventListener(win, "mousedown", this.onActiveChange, false);

        var doc = win.document;
        if (Dom.isAncestor(this.stateChangeEl, doc))
            this.removeStateChangeHandlers();
    }