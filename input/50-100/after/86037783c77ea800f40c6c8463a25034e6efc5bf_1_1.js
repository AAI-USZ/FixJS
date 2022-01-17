function() {
            this.attachToParentComponent();
            if (this._element) {
                // the DOM content of the component was dynamically modified
                // but it hasn't been drawn yet, we're going to assume that
                // this new DOM content is the desired original content for
                // this component since it has been set at deserialization
                // time.
                if (this._newDomContent) {
                    this.originalContent = this._newDomContent;
                } else {
                    this.originalContent = Array.prototype.slice.call(this._element.childNodes, 0);
                }
            }
            if (! this.hasOwnProperty("identifier")) {
                this.identifier = Montage.getInfoForObject(this).label;
            }
        }