function(event)
    {
        this.clickedPropTag = null;
        if (Events.isLeftClick(event) && this.clickedDisableButton(event))
        {
            this.clickedPropTag = this.getPropTag(event);

            // Don't select text when double-clicking the disable button.
            Events.cancelEvent(event);
        }
    }