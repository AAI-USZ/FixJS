function(event)
    {
        // Escape Key will clear the field and clear the search results
        if (event.keyCode === WebInspector.KeyboardShortcut.Keys.Esc.code) {
            event.consume(true);
            this.cancelSearch();
            WebInspector.setCurrentFocusElement(WebInspector.previousFocusElement());
            if (WebInspector.currentFocusElement() === event.target)
                WebInspector.currentFocusElement().select();
            return false;
        }

        if (!isEnterKey(event))
            return false;

        // Select all of the text so the user can easily type an entirely new query.
        event.target.select();

        // Only call performSearch if the Enter key was pressed. Otherwise the search
        // performance is poor because of searching on every key. The search field has
        // the incremental attribute set, so we still get incremental searches.
        this._onSearch(event);

        // Call preventDefault since this was the Enter key. This prevents a "search" event
        // from firing for key down. This stops performSearch from being called twice in a row.
        event.preventDefault();
    }