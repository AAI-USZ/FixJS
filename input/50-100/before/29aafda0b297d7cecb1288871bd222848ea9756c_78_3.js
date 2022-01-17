function(context, win)
    {
        if (Dom.domUtils)
        {
            // Normally these would not be required, but in order to update after the state is set
            // using the options menu we need to monitor these global events as well
            var doc = win.document;
            context.addEventListener(doc, "mouseover", this.onHoverChange, false);
            context.addEventListener(doc, "mousedown", this.onActiveChange, false);
        }
    }