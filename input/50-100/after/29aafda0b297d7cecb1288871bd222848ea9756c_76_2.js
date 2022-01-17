function(event)
    {
        if (!Events.isLeftClick(event))
            return;

        if (Events.isDoubleClick(event) && !this.clickedDisableButton(event))
        {
            var row = Dom.getAncestorByClass(event.target, "cssRule");
            if (row && !Dom.getAncestorByClass(event.target, "cssPropName")
                && !Dom.getAncestorByClass(event.target, "cssPropValue"))
            {
                this.insertPropertyRow(row);
                Events.cancelEvent(event);
            }
        }
    }