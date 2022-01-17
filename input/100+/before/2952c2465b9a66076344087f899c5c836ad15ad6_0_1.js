function (view, render, aBtn, iBtn) {
	    	//TODO: Remove reference to string view
		    if (this._currentDocument.model.currentView !== view) {
                //
                this._currentDocument.model.switchViewTo(view);
                iBtn.setAttribute('class', 'inactive');
                aBtn.removeAttribute('class');
                //TODO: Add document parsing to reload view
                this._currentDocument.reloadView(view, this.fileTemplate);
            }
	    }