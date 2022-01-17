function(event)
    {
        if (!Events.isLeftClick(event))
            return;

        var target = event.target;
        if (!Css.hasClass(target, "cookieHeaderCellBox"))
            return;

        var header = Dom.getAncestorByClass(target, "cookieHeaderRow");
        if (!header)
            return;

        this.onStartResizing(event);

        Events.cancelEvent(event);
    }