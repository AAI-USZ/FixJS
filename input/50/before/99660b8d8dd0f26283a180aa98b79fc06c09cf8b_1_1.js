function() {
            if (App.bars['tbar'])
                App.bars['tbar'].invokeTool({tool: this.options.singleSelectAction});

            if (this.autoClearSelection)
                this._selectionModel.clear();
        }