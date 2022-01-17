function(state)
    {
        // Wait for loadedContext to restore the panel
        if (this.context.loaded)
        {
            var state;
            Persist.restoreObjects(this, state);

            if (state)
            {
                if (state.scrollTop)
                    this.panelNode.scrollTop = state.scrollTop;

                if (state.groupOpened)
                    this.groupOpened = state.groupOpened;

                if (state.styleOpened)
                    this.styleOpened = state.styleOpened;
            }
        }

        if (this.selection)
            this.refresh();
    }