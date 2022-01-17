function() {
            topic.publish('/app/toolbar/invoke', this.options.singleSelectAction);

            if (this.autoClearSelection)
                this._selectionModel.clear();
        }