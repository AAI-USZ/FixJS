function () {
            //
            if (this._currentDocument.model.currentView !== 'design') {
                //
                this._currentDocument.model.switchViewTo('design');
                this.btnCode.setAttribute('class', 'inactive');
                this.btnDesign.removeAttribute('class');
                //this._currentDocument.model.file.content.body = '<div class="test">hello</div><div class="test">hello</div>';
                var render = this.renderDesignView.bind(this._currentDocument);
                render();
            }
        }