function(event)
    {
        var row;

        if (!Events.isLeftClick(event))
            return;

        // XXjoe Hack to only allow clicking on the checkbox
        if ((event.clientX <= 20) && Events.isSingleClick(event))
        {
            if (Css.hasClass(event.target, "textEditor inlineExpander"))
                return;

            row = Dom.getAncestorByClass(event.target, "cssProp");
            if (row && Css.hasClass(row, "editGroup"))
            {
                this.disablePropertyRow(row);
                Events.cancelEvent(event);
            }
        }
        else if ((event.clientX >= 20) && Events.isDoubleClick(event))
        {
            row = Dom.getAncestorByClass(event.target, "cssRule");
            if (row && !Dom.getAncestorByClass(event.target, "cssPropName")
                && !Dom.getAncestorByClass(event.target, "cssPropValue"))
            {
                this.insertPropertyRow(row);
                Events.cancelEvent(event);
            }
        }
    }