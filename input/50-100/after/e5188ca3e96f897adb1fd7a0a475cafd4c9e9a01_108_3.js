function(context, win)
    {
        if (Dom.domUtils)
        {
            // Normally these would not be required, but in order to update after the state is set
            // using the options menu we need to monitor these global events as well
            context.addEventListener(win, "mouseover", this.onHoverChange, false);
            context.addEventListener(win, "mousedown", this.onActiveChange, false);
        }
    }