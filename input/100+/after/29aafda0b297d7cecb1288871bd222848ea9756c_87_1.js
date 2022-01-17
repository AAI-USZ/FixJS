function(object, forceUpdate, noEditChange)
    {
        if (!object)
            object = this.getDefaultSelection();

        if (FBTrace.DBG_PANELS)
        {
            FBTrace.sysout("firebug.select " + this.name + " forceUpdate: " + forceUpdate + " " +
                object + ((object == this.selection) ? "==" : "!=") + this.selection);
        }

        if (forceUpdate || object != this.selection)
        {
            this.selection = object;
            this.updateSelection(object);

            // Update the Edit button to reflect editability of the selection.
            // (Except during editing, when it should always be possible to click it.)
            var editButton = Firebug.chrome.$("fbToggleHTMLEditing");
            editButton.disabled = (this.selection && !this.isEditing() &&
                Css.nonEditableTags.hasOwnProperty(this.selection.localName));

            // Distribute selection change further to listeners.
            Events.dispatch(Firebug.uiListeners, "onObjectSelected", [object, this]);

            // If the 'free text' edit mode is active change the current markup
            // displayed in the editor (textarea) so that it corresponds to the current
            // selection. This typically happens when the user clicks on object-status-path
            // buttons in the toolbar.
            // For the case when the selection is changed from within the editor, don't
            // change the edited element.
            if (this.isEditing() && !noEditChange)
                this.editNode(object);
        }
    }