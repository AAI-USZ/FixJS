function () {
            //
            if (this._currentDocument.model.currentView !== 'design') {
                //
                this._currentDocument.model.switchViewTo('design');
                this.btnCode.setAttribute('class', 'inactive');
                this.btnDesign.removeAttribute('class');
            }
        }