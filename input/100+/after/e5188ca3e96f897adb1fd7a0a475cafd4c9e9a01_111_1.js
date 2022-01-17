function(event)
    {
        if (event.keyCode == KeyEvent.DOM_VK_ESCAPE && !this.completeAsYouType)
        {
            var reverted = this.getAutoCompleter().revert(this.input);
            if (reverted)
                Events.cancelEvent(event);
        }
        else if (event.keyCode == KeyEvent.DOM_VK_RIGHT && this.completeAsYouType)
        {
            if (this.getAutoCompleter().acceptCompletion(this.input))
                Events.cancelEvent(event);
        }
        else if (event.charCode && this.advanceToNext(this.target, event.charCode))
        {
            Firebug.Editor.tabNextEditor();
            Events.cancelEvent(event);
        }
        else if (this.numeric && event.charCode &&
            (event.charCode < KeyEvent.DOM_VK_0 || event.charCode > KeyEvent.DOM_VK_9) &&
            event.charCode != KeyEvent.DOM_VK_INSERT && event.charCode != KeyEvent.DOM_VK_DELETE)
        {
            Events.cancelEvent(event);
        }
        else if (event.keyCode == KeyEvent.DOM_VK_BACK_SPACE ||
            event.keyCode == KeyEvent.DOM_VK_DELETE)
        {
            // If the user deletes text, don't autocomplete after the upcoming input event
            this.ignoreNextInput = true;
        }
    }