function(context, win)
    {
        var doc = win.document;
        context.removeEventListener(doc, "mouseover", this.onHoverChange, false);
        context.removeEventListener(doc, "mousedown", this.onActiveChange, false);

        if (Dom.isAncestor(this.stateChangeEl, doc))
        {
            this.removeStateChangeHandlers();
        }
    }