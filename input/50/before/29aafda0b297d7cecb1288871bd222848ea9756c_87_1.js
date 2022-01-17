function()
    {
        Firebug.Editor.stopEditing();

        if (!this.selection.parentNode)
        {
            Firebug.chrome.clearStatusPath();

            // nextSelection is set in mutation handlers. When the editing mode stops
            // this variable (if set) will be used as the next selected node, effectively
            // replacing the old selected node that doesn't have to exist any more (after
            // the editing).
            // If nextSelection is not set a default node (e.g. body) will be selected.
            // See issue 5506
            this.select(this.nextSelection, true);
            delete this.nextSelection;
        }
    }