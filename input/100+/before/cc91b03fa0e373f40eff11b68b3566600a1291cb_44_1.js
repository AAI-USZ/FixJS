function(object, forceUpdate)
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

            // The Edit button (in the toolbar) must be updated every time the selection
            // changes. Some elements (such as <html>) can't be edited (see issue 5506).
            var edit = Firebug.chrome.$("fbToggleHTMLEditing");
            edit.disabled = object ? Css.nonEditableTags.hasOwnProperty(object.localName) : false;

            // Distribute selection change further to listeners.
            Events.dispatch(Firebug.uiListeners, "onObjectSelected", [object, this]);

            // If the 'free text' edit mode is active change the current markup
            // displayed in the editor (textarea) so that it corresponds to the current
            // selection. This typically happens when the user clicks on object-status-path
            // buttons in the toolbar.
            if (this.isEditing())
                this.editNode(object);
        }
    }