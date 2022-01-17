function()
    {
        Firebug.Editor.stopEditing();

        // After mutation listeners have made the element appear in the panel,
        // re-select it (and also update the disable state of the "Edit" button).
        this.context.delay(function()
        {
            this.select(this.selection, true);
        }.bind(this));
    }