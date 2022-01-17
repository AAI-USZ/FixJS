function(value) {
            if (value === this._currentDocument) {
                return;
            }

            if(this._currentDocument && this._currentDocument.currentView === "design") {
                this._currentDocument.model.draw3DGrid = document.application.model.show3dGrid;
            }

            this._currentDocument = value;

            if(this._currentDocument && this._currentDocument.currentView === "design") {
                document.application.model.show3dGrid = this._currentDocument.model.draw3DGrid;
                this.topLevelMenu[2].entries[5].checked = this._currentDocument.model.draw3DGrid;
            }

            if(!this._currentDocument) {
                // No document - disable all menu items
                this.documentEnabledItems.forEach(function(index) {
                    index.enabled = false;
                });
                this.designDocumentEnabledItems.forEach(function(index) {
                    index.enabled = false;
                });
            } else {
                this.documentEnabledItems.forEach(function(index) {
                    index.enabled = true;
                });

                if(this.currentDocument.currentView === "design") {
                    this.designDocumentEnabledItems.forEach(function(index) {
                        index.enabled = true;
                    });
                } else {
                    this.designDocumentEnabledItems.forEach(function(index) {
                        index.enabled = false;
                    });
                }
            }

        }