function (view, render, aBtn, iBtn) {
	    	//TODO: Remove reference to string view
		    if (this._currentDocument.model.currentView !== view) {
                //
                this._currentDocument.model.switchViewTo(view);
                iBtn.setAttribute('class', 'inactive');
                aBtn.removeAttribute('class');
                //TODO: Add document parsing to reload view
                this._currentDocument.reloadView(view, this.fileTemplate, {
                    mode: 'html',
                    libs: this._currentDocument.model.libs,
                    file: this._currentDocument.model.file,
                    webgl: this._currentDocument.model.webGlHelper.glData,
                    styles: this._currentDocument.model.getStyleSheets(),
                    template: this._currentDocument.fileTemplate,
                    document: this._currentDocument.model.views.design.iframe.contentWindow.document,
                    head: this._currentDocument.model.views.design.iframe.contentWindow.document.head,
                    body: this._currentDocument.model.views.design.iframe.contentWindow.document.body,
                    mjsTemplateCreator: this._currentDocument.model.views.design.iframe.contentWindow.mjsTemplateCreator
                });
            }
	    }