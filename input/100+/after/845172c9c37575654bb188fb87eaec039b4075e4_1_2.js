function(event)
    {
        var disabled = !event.target.checked;

        function callback(newStyle)
        {
            if (!newStyle)
                return;

            this.style = newStyle;
            this._styleRule.style = newStyle;

            if (this.treeOutline.section && this.treeOutline.section.pane)
                this.treeOutline.section.pane.dispatchEventToListeners("style property toggled");

            this._updatePane();

            delete this._parentPane._userOperation;
        }

        this._parentPane._userOperation = true;
        this.property.setDisabled(disabled, callback.bind(this));
        event.consume();
    }